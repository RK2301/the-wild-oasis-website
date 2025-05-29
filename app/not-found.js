import Link from "next/link";

export const metadata = {
    title: 'Not Found'
}

function NotFound() {
    return (
        <div className='text-center space-y-6 h-full flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-semibold'>
                This page could not be found :(
            </h1>
            <Link
                href='/'
                className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg rounded-md'
            >
                Go back home
            </Link>
        </div>
    );
}

export default NotFound;
