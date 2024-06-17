// components/SkeletonCard.tsx
import React from 'react'

const SkeletonCard: React.FC = () => {
    return (
        <div className="animate-pulse rounded-md border bg-gray-100 p-4 shadow-md">
            <div className="mb-4 h-4 w-3/4 rounded bg-gray-300"></div>
            <div className="mb-4 h-4 w-1/2 rounded bg-gray-300"></div>
            <div className="mb-4 h-4 w-full rounded bg-gray-300"></div>
        </div>
    )
}

export default SkeletonCard
