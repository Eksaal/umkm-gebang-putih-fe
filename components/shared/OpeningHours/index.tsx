import React from 'react'
import { FaClock } from 'react-icons/fa'

interface DayInfo {
    open: boolean
    open_time: string
    close_time: string
}

interface OpeningHoursProps {
    days: {
        [key: string]: DayInfo
    }
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ days }) => {
    const dayNames: { [key: string]: string } = {
        senin: 'Senin',
        selasa: 'Selasa',
        rabu: 'Rabu',
        kamis: 'Kamis',
        jumat: 'Jumat',
        sabtu: 'Sabtu',
        minggu: 'Minggu',
    }

    return (
        <div>
            {Object.entries(days).map(
                ([day, { open, open_time, close_time }], index) =>
                    open ? (
                        <div key={day} className="mb-2 flex items-center">
                            <div className="w-10">
                                {index === 0 ? (
                                    <FaClock className="mr-2 text-green-500" />
                                ) : (
                                    <div className="mr-2"></div>
                                )}
                            </div>
                            <div className="min-w-40">
                                <span className="capitalize">
                                    {dayNames[day]}
                                </span>
                            </div>

                            <span>
                                {open_time} - {close_time} WIB
                            </span>
                        </div>
                    ) : null,
            )}
        </div>
    )
}

export default OpeningHours
