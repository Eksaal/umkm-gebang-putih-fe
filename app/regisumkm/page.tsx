'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUmkmForm } from '@/hooks/useUMKMForm'

export default function UmkmDataForm() {
    const { storeData } = useUmkmForm()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<any>({
        defaultValues: {
            name: '',
            category: '',
            product_type: '',
            business_type: '',
            business_address: '',
            business_contact: '',
            contact_name: '',
            opening_days: '',
            special_closing_days: '',
            opening_hours: '',
            services: '',
            payment_methods: '',
            facilities: '',
            latitude: 0,
            longitude: 0,
            food_price: '',
            drink_price: '',
        },
    })

    const handleForm: SubmitHandler<any> = async (data) => {
        try {
            storeData(data)
            router.refresh()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="mx-auto w-full max-w-[900px] space-y-8 rounded bg-white p-10">
            <h1 className="text-center text-[22px] font-semibold leading-7">
                Add Business Data
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                        {
                            name: 'name',
                            label: 'Nama usaha',
                            type: 'text',
                            placeholder: 'Toko bu sri...',
                        },
                        {
                            name: 'category',
                            label: 'Katagori',
                            type: 'text',
                            placeholder: 'Makanan...',
                        },
                        {
                            name: 'product_type',
                            label: 'Tipe Produk',
                            type: 'text',
                            placeholder: 'Ayam geprek..',
                        },
                        {
                            name: 'business_type',
                            label: 'Business Type',
                            type: 'text',
                            placeholder: 'Business Type...',
                        },
                        {
                            name: 'business_address',
                            label: 'Business Address',
                            type: 'text',
                            placeholder: 'Business Address...',
                        },
                        {
                            name: 'business_contact',
                            label: 'Business Contact',
                            type: 'text',
                            placeholder: 'Business Contact...',
                        },
                        {
                            name: 'contact_name',
                            label: 'Contact Name',
                            type: 'text',
                            placeholder: 'Contact Name...',
                        },
                        {
                            name: 'opening_days',
                            label: 'Opening Days',
                            type: 'text',
                            placeholder: 'Opening Days...',
                        },
                        {
                            name: 'special_closing_days',
                            label: 'Special Closing Days',
                            type: 'text',
                            placeholder: 'Special Closing Days...',
                        },
                        {
                            name: 'opening_hours',
                            label: 'Opening Hours',
                            type: 'text',
                            placeholder: 'Opening Hours...',
                        },
                        {
                            name: 'services',
                            label: 'Services',
                            type: 'text',
                            placeholder: 'Services...',
                        },
                        {
                            name: 'payment_methods',
                            label: 'Payment Methods',
                            type: 'text',
                            placeholder: 'Payment Methods...',
                        },
                        {
                            name: 'facilities',
                            label: 'Facilities',
                            type: 'text',
                            placeholder: 'Facilities...',
                        },
                        {
                            name: 'latitude',
                            label: 'Latitude',
                            type: 'number',
                            step: '0.000001',
                            placeholder: 'Latitude...',
                        },
                        {
                            name: 'longitude',
                            label: 'Longitude',
                            type: 'number',
                            step: '0.000001',
                            placeholder: 'Longitude...',
                        },
                        {
                            name: 'food_price',
                            label: 'Food Price Range',
                            type: 'text',
                            placeholder: 'Food Price Range...',
                        },
                        {
                            name: 'drink_price',
                            label: 'Drink Price Range',
                            type: 'text',
                            placeholder: 'Drink Price Range...',
                        },
                    ].map((field) => (
                        <div key={field.name} className="flex flex-col">
                            <label className="form-label mb-2 font-medium">
                                {field.label}
                            </label>
                            <Input
                                {...register(field.name, {
                                    required: `${field.label} is required`,
                                })}
                                required
                                type={field.type}
                                step={field.step}
                                placeholder={field.placeholder}
                                className="rounded border border-gray-300 p-2"
                            />
                        </div>
                    ))}
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
