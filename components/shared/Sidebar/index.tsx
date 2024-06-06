// @/components/Layout/Sidebar.tsx
import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { SlHome } from 'react-icons/sl'
import { BsInfoSquare, BsEnvelopeAt } from 'react-icons/bs'
import { FaTshirt, FaRedhat } from 'react-icons/fa'

import logo from '@/public/next.svg'

interface SidebarProps {
    show: boolean
    setter: (value: boolean | ((val: boolean) => boolean)) => void
}

interface MenuItemProps {
    icon: React.ReactNode
    name: string
    route: string
}

const Sidebar: React.FC<SidebarProps> = ({ show, setter }) => {
    const pathname = usePathname()
    const router = useRouter()

    const className =
        'bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed  top-0 bottom-0 left-0 '
    const appendClass = show ? ' ml-0' : ' ml-[-250px] md:ml-0'

    const MenuItem: React.FC<MenuItemProps> = ({ icon, name, route }) => {
        const colorClass =
            pathname === route ? 'text-white' : 'text-white/50 hover:text-white'

        return (
            <Link
                href={route}
                onClick={() => {
                    setter((oldVal) => !oldVal)
                }}
                className={`text-md flex gap-1 border-b-[1px] border-b-white/10 py-3 pl-6 [&>*]:my-auto ${colorClass} -z-20`}
            >
                <div className="flex w-[30px] text-xl [&>*]:mx-auto">
                    {icon}
                </div>
                <div>{name}</div>
            </Link>
        )
    }

    const ModalOverlay: React.FC = () => (
        <div
            className={`fixed bottom-0 left-0 right-0 top-0 z-30 flex bg-black/50 md:hidden`}
            onClick={() => {
                setter((oldVal) => !oldVal)
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass} -z-30`}>
                <div className="flex p-2">
                    <Link href="/">
                        <img
                            src={logo.src}
                            alt="Company Logo"
                            width={300}
                            height={300}
                        />
                    </Link>
                </div>
                <div className="flex flex-col">
                    <MenuItem name="Home" route="/" icon={<SlHome />} />
                    <MenuItem
                        name="T-Shirts"
                        route="/t-shirts"
                        icon={<FaTshirt />}
                    />
                    <MenuItem name="Hats" route="/hats" icon={<FaRedhat />} />
                    <MenuItem
                        name="About Us"
                        route="/about"
                        icon={<BsInfoSquare />}
                    />
                    <MenuItem
                        name="Contact"
                        route="/contact"
                        icon={<BsEnvelopeAt />}
                    />
                </div>
            </div>
            {show ? <ModalOverlay /> : null}
        </>
    )
}

export default Sidebar
