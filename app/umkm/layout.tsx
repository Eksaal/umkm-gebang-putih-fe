'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/shared/Sidebar'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className="flex">
            <Sidebar show={showSidebar} setter={setShowSidebar} />
            <div className="flex-1">
                <button
                    className="mb-4 md:hidden"
                    onClick={() => setShowSidebar((prev) => !prev)}
                >
                    Toggle Sidebar
                </button>
                {children}
            </div>
        </div>
    )
}

export default Layout
