'use client'

import { useCallback, useState } from "react"
import { updateProfile } from "../_lib/actions"
import SubmitButton from "./SubmitButton"
import toast from "react-hot-toast"

function UpdateProfileForm({ children, guest }) {
    const [isLoading, setIsLoading] = useState(false)

    const {
        id,
        fullName,
        email,
        countryFlag,
        nationalID,
        nationality
    } = guest

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)

        setIsLoading(true)
        //call the server action to update the profile
        //it's fine as we can call it from event handler in CC
        try {
            await updateProfile(formData)

            //success so show success toast
            toast.success('Profile updated successfully!')
        } catch (e) {
            console.log(e);
            throw e
        } finally {
            setIsLoading(false)
        }
    }, [])


    return (
        <form
            // action={updateProfile}
            onSubmit={handleSubmit}
            className="bg-primary-900 py-8 px-4 md:px-12 text-lg flex gap-6 flex-col"
        >
            <div className="space-y-2">
                <label htmlFor="fullName">Full name</label>
                <input
                    disabled
                    name="fullName"
                    defaultValue={fullName}
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email">Email address</label>
                <input
                    disabled
                    name="email"
                    defaultValue={email}
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="nationality">Where are you from? *</label>
                    <img
                        src={countryFlag}
                        alt="Country flag"
                        className="h-5 rounded-sm"
                    />
                </div>
                {children}

            </div>

            <div className="space-y-2">
                <label htmlFor="nationalID">National ID number *</label>
                <input
                    name="nationalID"
                    defaultValue={nationalID}
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                />
            </div>

            <div className="flex justify-end items-center gap-6">
                <SubmitButton isLoading={isLoading}>Update profile</SubmitButton>
            </div>
        </form>
    )
}


export default UpdateProfileForm
