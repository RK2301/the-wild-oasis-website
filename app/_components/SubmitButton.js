'use client'

import { useFormStatus } from "react-dom"
import SpinnerMini from "./SpinnerMini"


function SubmitButton({ children, disabled, small, isLoading }) {
    const { pending } = useFormStatus()

    return (
        <button
            className={`bg-accent-500 px-8 py-4 text-primary-800 font-semibold
         hover:bg-accent-600 transition-all
          rounded-sm
          disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300
          flex items-center justify-center gap-4 basis-10/12 ${small ? 'md:basis-5/12' : 'md:basis-4/12'}
          `}
            disabled={pending || disabled || isLoading}
        >
            {(pending || isLoading) && <SpinnerMini />}
            <span> {children} </span>
        </button>
    )
}

export default SubmitButton
