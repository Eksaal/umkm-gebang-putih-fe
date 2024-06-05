import Logout from '@/app/account/verify/_logout'
import Resend from '@/app/account/verify/_resend'
import VerifyRedirect from '@/app/account/verify/_verify-redirect'
import { useAuth } from '@/hooks/useAuth'
import { HOME_PAGE, LOGIN_PAGE } from '@/lib/redirect'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page({
    searchParams,
}: {
    searchParams: { token: string }
}) {
    const { loggedIn, isEmailVerified, verifyEmail } = useAuth()
    if (!loggedIn) {
        redirect(LOGIN_PAGE)
    }

    if (isEmailVerified) {
        redirect(HOME_PAGE)
    }

    if (searchParams?.token) {
        if (await verifyEmail(searchParams.token)) {
            redirect('/')
        }
    }

    return (
        <>
            <VerifyRedirect />
            <div className="container">
                <div className="bg-darkblue min-h-screen">
                    <div className="py-6 text-center">
                        <Link href={HOME_PAGE}>Home</Link>
                    </div>
                    <div className="flex min-h-[calc(100vh-77px)] items-center justify-center p-4">
                        <div className="mx-auto w-full max-w-[600px] space-y-[25px] rounded bg-white p-[25px]">
                            <h1 className="text-center text-[22px] font-semibold leading-7">
                                Confirm your email
                            </h1>

                            <p>
                                We&apos;ve sent an email to your inbox - please
                                click that link to activate your account.
                                Didn&apos;t receive it?{' '}
                                <Resend>Click here</Resend> to resend!
                            </p>

                            <div className="mt-8 text-center">
                                <Logout />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
