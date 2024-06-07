'use client'
import React from 'react'
import Sidebar from '@/components/shared/Sidebar'

const UmkmLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow">{children}</div>
        </div>
    )
}

export default UmkmLayout
