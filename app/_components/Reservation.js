import { auth } from '@/app/_lib/auth'
import { getBookedDatesByCabinId, getCabin, getSettings } from "@/app/_lib/data-service"
import DateSelector from "./DateSelector"
import ReservationForm from "./ReservationForm"
import LoginMessage from "./LoginMessage";


async function Reservation({ cabinId }) {

    const cabin = await getCabin(cabinId)
    const [settings, bookedDates, session] = await Promise.all([getSettings(),
    getBookedDatesByCabinId(cabinId), auth()])

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2
                    border border-primary-800
                    gap-8 md:gap-1
                    p-1
                    "
        >
            <DateSelector
                settings={settings}
                bookedDates={bookedDates}
                cabin={cabin}
            />

            {session?.user && <ReservationForm cabin={cabin} user={session.user} />}
            {!session && <LoginMessage />}

        </div>
    )
}

export default Reservation
