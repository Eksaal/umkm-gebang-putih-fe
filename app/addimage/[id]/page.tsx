'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUmkmForm } from '@/hooks/useUMKMForm'
import { useState } from 'react'

export default function ImageUploadForm() {
    const router = useRouter()
    const [imageBase64, setImageBase64] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<any>({
        defaultValues: {
            image: null,
        },
    })
    const { storePicture } = useUmkmForm()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageBase64(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleForm: SubmitHandler<any> = async (data) => {
        if (!imageBase64) {
            console.error('Image is required')
            return
        }

        try {
            const formData = { picture: imageBase64 }
            await storePicture(formData)
            router.refresh()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="mx-auto w-full max-w-[900px] space-y-8 rounded bg-white p-10">
            <h1 className="text-center text-[22px] font-semibold leading-7">
                Upload Image
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
                        onChange={handleImageChange}
                        className="rounded border border-gray-300 p-2"
                    />
                </div>

                <div className="text-center">
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}
