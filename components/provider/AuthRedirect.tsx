'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthRedirect() {
    const { loggedIn } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loggedIn) {
            router.push('/')
        }
    })

    return <></>
}
