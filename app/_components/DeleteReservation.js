'use client'

import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';
import SpinnerMini from './SpinnerMini';


function DeleteReservation({ bookingId, onDelete }) {

  const [isPending, startTransition] = useTransition()

  const handleDeleteReservation = () => {
    if (confirm('Are you sure you want to delete this reservation ? '))
      startTransition(() => onDelete(bookingId))
  }

  return (
    <button
      className='group flex flex-1 items-center justify-center gap-2
                uppercase text-xs font-bold
              text-primary-300 flex-grow py-2
              hover:bg-red-600 transition-colors hover:text-primary-900'
      onClick={handleDeleteReservation}
      disabled={isPending}
    >
      {!isPending &&
        <>
          <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
          <span className='mt-1'>Delete</span>
        </>
      }

      {isPending &&
        <span
          className='mx-auto'
        >
          <SpinnerMini />
        </span>
      }
    </button >
  );
}

export default DeleteReservation;
