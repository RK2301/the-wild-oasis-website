'use client'

import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker, UI } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {

  const { range, setRange, resetRange } = useReservation()

  const displayeRange = isAlreadyBooked(range, bookedDates)
    ? {} : range;

  const {
    regularPrice,
    discount,
  } = cabin

  const numNights = differenceInDays(displayeRange.to, displayeRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const {
    minBookingLength,
    maxBookingLength
  } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-2 md:pt-7 place-self-center"
        mode="range"
        selected={displayeRange}
        onSelect={setRange}

        min={minBookingLength}
        max={maxBookingLength}
        startMonth={new Date()}
        // hidden={{ before: new Date() }}
        toYear={new Date().getFullYear() + 2}
        captionLayout="dropdown"
        numberOfMonths={1}

        disabled={curDate => isPast(curDate) || bookedDates.some(date => isSameDay(date, curDate))}
      // classNames={{
      //   months: "bg-primary-900 p-2 rounded-lg overflow-hidden",
      //   day: "rounded-md hover:bg-accent-400 hover:text-white transition",
      // }}

      />

      <div className="flex items-center justify-between 
      px-2 md:px-8
     bg-accent-500 text-primary-800 min-h-[72px]">

        <div className="flex items-center gap-2 md:gap-6">
          <p className="flex items-baseline">
            {discount > 0 ? (
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl">${regularPrice - discount}</span>

                <div>
                  <span className="line-through font-semibold text-primary-700">
                    ${regularPrice}
                  </span>

                  <span className="">/night</span>
                </div>

              </div>
            ) : (
              <>
                <span className="text-2xl">${regularPrice}</span>
                <span className="">/night</span>
              </>
            )}
          </p>


          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
