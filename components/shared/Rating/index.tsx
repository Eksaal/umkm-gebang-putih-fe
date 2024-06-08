import React, { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa'

interface IRatingProps {
    readonly initialValue?: number
    readonly disabled?: boolean
    onChange?: (rating: number) => void
}

const Rating: React.FunctionComponent<IRatingProps> = ({
    initialValue = 0,
    disabled = false,
    onChange,
}) => {
    const [rating, setRating] = useState<number>(initialValue)
    const [hover, setHover] = useState<number | null>(null)

    // Update rating when initialValue changes
    useEffect(() => {
        setRating(initialValue)
    }, [initialValue])

    const handleClick = (index: number) => {
        if (!disabled) {
            setRating(index)
            if (onChange) {
                onChange(index)
            }
        }
    }

    return (
        <div className="flex">
            {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`p-1 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => !disabled && setHover(star)}
                    onMouseLeave={() => !disabled && setHover(null)}
                >
                    <FaStar
                        size={24}
                        color={
                            (hover || rating) >= star ? '#ffc107' : '#e4e5e9'
                        }
                    />
                </button>
            ))}
        </div>
    )
}

export default Rating
