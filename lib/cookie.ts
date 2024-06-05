import {
    setCookie as set,
    getCookie as get,
    deleteCookie as destroy,
} from 'cookies-next'

export const setCookie = (
    key: string,
    value: any,
    args = {
        maxAge: 31536000,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
    },
) => {
    set(key, value, args)
}

export const getCookie = (key: string, options?: {}) => {
    return get(key, options)
}

export const deleteCookie = (key: string, options?: {}) => {
    return destroy(key, options)
}
