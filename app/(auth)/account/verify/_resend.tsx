'use client'

import { useAuth } from '@/hooks/useAuth'

export default function Resend({ children }: { children: React.ReactNode }) {
    const { resendEmailVerification } = useAuth()

    return (
        <button
            type="button"
            className="text-primary text-[red] hover:underline"
            onClick={resendEmailVerification}
        >
            {children}
        </button>
    )
}
