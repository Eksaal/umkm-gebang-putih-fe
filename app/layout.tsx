import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import 'leaflet/dist/leaflet.css'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import StoreInitializer from '@/store/StoreInitializer'
import { useAuth } from '@/hooks/useAuth'
import { unstable_noStore as noStore } from 'next/cache'
import Navbar from '@/components/shared/Navbar'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '700', '800', '900'],
})

export const metadata: Metadata = {
    title: 'UMKM Gebang Putih',
    description: 'Umkm gebang putih',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    noStore()

    const { fetchUser } = useAuth()
    const user = await fetchUser()

    return (
        <html lang="en">
            <body
                className={cn(
                    poppins.className,
                    ' bg-white text-base font-normal text-black antialiased',
                )}
            >
                <StoreInitializer auth={user} />
                <main>
                    <Theme>
                        <Navbar />
                        {children}
                    </Theme>
                </main>
                <Toaster />
            </body>
        </html>
    )
}
