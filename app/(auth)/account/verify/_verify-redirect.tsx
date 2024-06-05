'use client'

import { useAuth } from '@/hooks/useAuth'
import { HOME_PAGE, LOGIN_PAGE } from '@/lib/redirect'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function VerifyRedirect() {
    const { loggedIn, isEmailVerified } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loggedIn) {
            router.push(LOGIN_PAGE)
        } else if (loggedIn && isEmailVerified) {
            router.push(HOME_PAGE)
        }
    })

    return <></>
}
