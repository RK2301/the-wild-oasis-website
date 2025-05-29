'use server'

import { auth, signIn, signOut } from "@/app/_lib/auth"
import { createBooking, deleteBooking, getBooking, getBookings, updateBooking, updateGuest } from "@/app/_lib/data-service"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signInAction() {
    await signIn('google', {
        redirectTo: '/account'
    })
}

export async function signOutAction() {
    await signOut({
        redirectTo: '/'
    })
}

//This code is invoked at the backend
//so we need to make sure of 2 things:
// 1. user is authorized to do such an action
// 2. treat inputs as insafe
export async function updateProfile(formData) {

    //1. check if user authenticated
    const session = await auth()

    //it's common to throw error 
    //so it will be handled by the nearset error boundary
    if (!session)
        throw new Error("You must be authenticated to update profile")

    //2. get inputs from the formData
    const nationalID = formData.get('nationalID')
    const [nationality, countryFlag] = formData.get('nationality').split('%')

    //check if nationalID is valid and not to long
    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
        throw new Error('nationalID must be valid')

    //update profile data in Supabase DB
    const updateData = {
        nationalID,
        nationality,
        countryFlag
    }
    await updateGuest(session.user.guestId, updateData)

    //revalidate the cache and fetch fresh data related to the current route
    revalidatePath('/account/profile')
}

export async function deleteReservation(bookingId) {

    //check if user authenticated
    const session = await auth()
    if (!session)
        throw new Error('You must be authenticated to update profile')

    //check if the booking is related to the user who is 
    //request to delete it
    const guestBookings = await getBookings(session.user.guestId)
    const reqBooking = guestBookings.find(booking => booking.id === bookingId)

    //if no booking found then throw an error
    //user try delete booking not related to him
    if (!reqBooking)
        throw new Error('You Can\'nt delete this booking')

    await deleteBooking(bookingId)

    //revalidate the cache and fetch fresh data related to the current route
    //so new reservations will be fetched
    revalidatePath('/account/reservations')
}

/**This function is about get new reservation, and make request to the DB to add it
 * @param bookingData related booking data
 * @param formData data submitted from the form, like observations and numGuests
 */
export async function createReservation(bookingData, formData) {

    //check if user authenticated
    const session = await auth()
    if (!session)
        throw new Error('You must be authenticated to update profile')

    //create booking object
    const booking = {
        ...bookingData,
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations'),
        guestId: session.user.guestId,
        totalPrice: bookingData.cabinPrice,
        isPaid: false,
        status: 'unconfirmed'
    }

    //create booking
    await createBooking(booking)

    //revalidate the cache of the reservation
    //so user will see fresh data
    revalidatePath('/account/reservations')

    //alson revalid this path, as may user nav be to it quickly and still see 
    //the stale state for the cabins reservations dates
    revalidatePath(`/cabins/${bookingData.cabinId}`)

    //redirect user to thank you page
    redirect('/thankyou')

}


export async function UpdateReservation(formData) {
    // console.log(formData);

    //first check if user logged in
    const session = await auth()
    if (!session)
        throw new Error('You must be authenticated to update profile')

    const bookingId = Number(formData.get('bookingId'))

    //to protect ourself from malicious user that sent to lot text
    const observations = formData.get('observations').slice(0, 1000)
    const numGuests = Number(formData.get('numGuests'))

    //check if user try to update reservation that 
    //created by him, and not for another user
    //so first fetch booking data to check this
    const booking = await getBooking(bookingId)
    if (!booking)
        throw new Error('Booking Not Found')

    if (booking.guestId !== session.user.guestId)
        throw new Error('You don\'t have access to update this booking')

    //make input check for guest number
    //it should be a number
    if (isNaN(numGuests))
        throw new Error('numGuests should be a nmber')

    //get the data and make update request to supabase
    const updateFields = {
        observations,
        numGuests
    }

    //make update request
    await updateBooking(bookingId, updateFields)

    //revalidate this path because if user back to this page quickly after update
    //the reservation, won't see the stale data
    revalidatePath(`/account/reservations/edit/${bookingId}`)

    //invalid the cache for the reservation and redirect the user to the page
    //so the user will see the fresh data
    revalidatePath('/account/reservations')
    redirect('/account/reservations')
}