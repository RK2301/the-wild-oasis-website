'use client'


function error({ error, reset }) {
    return (
        <main className='flex justify-center items-center flex-col gap-6 h-full'>
            <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
            <p className='text-lg '>ERROR!</p>

            <button
                className='inline-block bg-accent-500 text-primary-800
             px-6 py-3
            text-lg rounded-md'
                onClick={reset}
            >
                Try again
            </button>
        </main>
    )
}

export default error
