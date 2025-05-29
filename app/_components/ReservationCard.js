import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from '@/app/_components/DeleteReservation';
import Image from 'next/image';
import Link from 'next/link';

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col md:flex-row border border-primary-800 overflow-hidden rounded-md">
      {/* IMAGE */}
      <div className="relative  md:h-44 md:aspect-square h-60 flex-shrink-0">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover border-b md:border-b-0 md:border-r border-primary-800"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-grow px-4 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold break-words">
            {numNights} nights in Cabin {name}
          </h3>
          <span
            className={
              isPast(new Date(startDate))
                ? "bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-md"
                : "bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-md"
            }
          >
            {isPast(new Date(startDate)) ? "PAST" : "UPCOMING"}
          </span>
        </div>

        <p className="text-lg text-primary-300 mt-1 break-words">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) — {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-4 mt-auto items-baseline flex-wrap">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <span className="text-primary-300">&bull;</span>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400 whitespace-nowrap">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      {/* on mobile: row, on md+: column */}
      <div className="flex md:flex-col border-t md:border-t-0 md:border-l border-primary-800 w-full md:w-[100px]">
        {!isPast(new Date(startDate)) && (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="flex-1 flex items-center justify-center gap-2 
              uppercase text-xs font-bold text-primary-300
              border-r md:border-b border-primary-800 py-2
              hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span>Edit</span>
            </Link>

            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </>
        )}
      </div>
    </div>
  );
}

/**
 * <div className='flex border border-primary-800'>
      <div className='relative h-40 aspect-square'>
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className='object-cover border-r border-primary-800'
        />
      </div>

      <div className='flex-grow px-6 py-3 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className='bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-md'>
              past
            </span>
          ) : (
            <span className='bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-md'>
              upcoming
            </span>
          )}
        </div>

        <p className='text-lg text-primary-300'>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>

        <div className='flex gap-5 mt-auto items-baseline'>
          <p className='text-xl font-semibold text-accent-400'>${totalPrice}</p>
          <p className='text-primary-300'>&bull;</p>
          <p className='text-lg text-primary-300'>
            {numGuests} guest{numGuests > 1 && 's'}
          </p>
          <p className='ml-auto text-sm text-primary-400'>
            Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      <div className='flex flex-col border-l border-primary-800 w-[100px]'>
        {
          !isPast(new Date(startDate)) &&
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
            >
              <PencilSquareIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
              <span className='mt-1'>Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </>
        }
      </div>
    </div>
 */
export default ReservationCard;
