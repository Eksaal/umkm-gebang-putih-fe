import type { Config } from 'tailwindcss'

const config = {
    darkMode: ['class'],
    
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            backgroundImage: {
                'umkm': "url('../public/homepage/bakground.png')",
            }
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
