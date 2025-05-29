import Link from "next/link";

export const metadata = {
    title: 'Cabin Not Found'
}

function NotFound() {

    return (
        <div className='text-center space-y-6 h-full flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-semibold'>
                This cabin could not be found :(
            </h1>
            <Link
                href='/cabins'
                className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg rounded-md'
            >
                Go back to Cabins
            </Link>
        </div>
    );
}

export default NotFound;
