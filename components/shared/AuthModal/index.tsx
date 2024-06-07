'use client'
import React, { useState } from 'react'
import Login from './login'
import ForgotPassword from './forgot-password'
import Register from './register'
import { GoX } from 'react-icons/go'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

type AuthState = 'login' | 'forgot-password' | 'register'

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [authState, setAuthState] = useState<AuthState>('login') // default state

    const renderComponent = () => {
        switch (authState) {
            case 'login':
                return <Login setAuthState={setAuthState} />
            case 'forgot-password':
                return <ForgotPassword setAuthState={setAuthState} />
            case 'register':
                return <Register setAuthState={setAuthState} />
            default:
                return null
        }
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
                <div className="flex justify-end p-2">
                    <GoX
                        onClick={onClose}
                        size={25}
                        className="cursor-pointer text-gray-600 hover:text-gray-900"
                    />
                </div>
                {renderComponent()}
            </div>
        </div>
    )
}

export default AuthModal
