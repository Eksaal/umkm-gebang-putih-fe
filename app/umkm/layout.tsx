import React, { useState } from 'react'
import Sidebar from '@/components/shared/Sidebar'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">{children}</div>
        </div>
    )
}

export default Layout
