'use client'

import { differenceInDays } from "date-fns";
import { useReservation } from "@/app/_components/ReservationContext";
import { createReservation } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {

  const { range, resetRange } = useReservation()
  const {
    maxCapacity,
    regularPrice,
    discount,
    id
  } = cabin;

  const startDate = range.from
  const endDate = range.to

  const numNights = differenceInDays(endDate, startDate)
  const cabinPrice = numNights * (regularPrice - discount)

  const reservationData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id
  }

  //for the action server function
  //pass this reservation data as first argument
  //then formData will be passed automatically as second arg
  const createReservationWithData = createReservation.bind(null, reservationData)

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-4 md:px-16 py-2 flex justify-between items-center'>
        <p>Logged in as </p>

        <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationWithData(formData)
          resetRange()
        }}
        className='bg-primary-900 py-10 px-2 md:px-16 text-lg flex gap-5 flex-col'
      >
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex md:flex-row md:justify-between md:items-center md:gap-6
          flex-col gap-4
        '>
          <p className='text-primary-300 text-base'>* Start by selecting dates</p>

          <SubmitButton
            disabled={!range.from || !range.to}
            small
          >
            Reserve now
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
