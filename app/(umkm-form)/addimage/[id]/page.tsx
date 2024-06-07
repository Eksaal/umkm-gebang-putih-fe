'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUmkmForm } from '@/hooks/useUMKMForm'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AuthRedirect from '@/components/provider/AuthRedirect'

export default function ImageUploadForm() {
    const router = useRouter()
    const { id } = useParams()
    const [imageBase64, setImageBase64] = useState<string | null>(null)
    const [menuImageBase64, setMenuImageBase64] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<any>({
        defaultValues: {
            image: null,
            menu_image: null,
        },
    })
    const { storePicture } = useUmkmForm()

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setImage: (value: string | null) => void,
    ) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleForm: SubmitHandler<any> = async (data) => {
        if (!imageBase64 || !menuImageBase64) {
            console.error('Both images are required')
            return
        }

        try {
            const formData = {
                id,
                picture: imageBase64,
                menu_image: menuImageBase64,
            }
            await storePicture(formData)
            router.push('/regisumkm')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="mx-auto w-full max-w-[900px] space-y-8 rounded bg-white py-28">
            <AuthRedirect />
            <h1 className="text-center text-[22px] font-semibold leading-7">
                Upload Images
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
                <div className="flex flex-col">
                    <label className="form-label mb-2 font-medium">Image</label>
                    <Input
                        {...register('image', {
                            required: 'Image is required',
                        })}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setImageBase64)}
                        className="rounded border border-gray-300 p-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="form-label mb-2 font-medium">
                        Menu Image
                    </label>
                    <Input
                        {...register('menu_image', {
                            required: 'Menu Image is required',
                        })}
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            handleImageChange(e, setMenuImageBase64)
                        }
                        className="rounded border border-gray-300 p-2"
                    />
                </div>

                <div className="text-center">
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-400"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}
