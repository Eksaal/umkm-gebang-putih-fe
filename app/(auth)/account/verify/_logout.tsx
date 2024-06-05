'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function Logout() {
    const { logout } = useAuth()
    const router = useRouter()

    return (
        <Button
            type="button"
            onClick={async () => {
                await logout()
                router.refresh()
            }}
        >
            Logout
        </Button>
    )
}
