'use client'

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext()
const initialState = { from: undefined, to: undefined }

const ReservationProvider = ({ children }) => {
    const [range, setRange] = useState(initialState)
    const resetRange = () => setRange(initialState)


    return (
        <ReservationContext.Provider value={{
            range,
            setRange,
            resetRange
        }}>
            {children}
        </ReservationContext.Provider>
    )
}

export const useReservation = () => {
    const value = useContext(ReservationContext)
    if (value === undefined)
        throw new Error('useReservation can\'t be used outside ReservationProvider')

    return value
}

export default ReservationProvider