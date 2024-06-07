'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUmkmForm } from '@/hooks/useUMKMForm'
import { useState } from 'react'
import AuthRedirect from '@/components/provider/AuthRedirect'

interface DropdownCheckboxProps {
    label: string
    options: any
    register: any
    name: string
}

const DropdownCheckbox = ({
    label,
    options,
    register,
    name,
}: DropdownCheckboxProps) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <AuthRedirect />
            <button
                type="button"
                className="w-full rounded border border-gray-300 p-2"
                onClick={() => setOpen(!open)}
            >
                {label}
            </button>
            {open && (
                <div className="absolute z-10 w-full rounded border border-gray-300 bg-white shadow-lg">
                    {options.map((option: any) => (
                        <label
                            key={option.value}
                            className="block cursor-pointer p-2"
                        >
                            <input
                                type="checkbox"
                                value={option.value}
                                {...register(name)}
                                className="mr-2"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}

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
            category: [],
            product_type: '',
            business_address: '',
            business_contact: '',
            contact_name: '',
            opening_hours: {
                senin: { open: false, open_time: '', close_time: '' },
                selasa: { open: false, open_time: '', close_time: '' },
                rabu: { open: false, open_time: '', close_time: '' },
                kamis: { open: false, open_time: '', close_time: '' },
                jumat: { open: false, open_time: '', close_time: '' },
                sabtu: { open: false, open_time: '', close_time: '' },
                minggu: { open: false, open_time: '', close_time: '' },
            },
            services: [],
            payment_methods: [],
            facilities: [],
            latitude: 0,
            longitude: 0,
            min_price: '',
            max_price: '',
        },
    })

    const handleForm: SubmitHandler<any> = async (data) => {
        try {
            const formattedData = {
                name: data.name,
                category: JSON.stringify(data.category),
                product_type: data.product_type,
                business_address: data.business_address,
                business_contact: data.business_contact,
                contact_name: data.contact_name,
                opening_hours: JSON.stringify(data.opening_hours),
                services: JSON.stringify(data.services),
                payment_methods: JSON.stringify(data.payment_methods),
                facilities: JSON.stringify(data.facilities),
                latitude: data.latitude,
                longitude: data.longitude,
                min_price: data.min_price,
                max_price: data.max_price,
            }

            const response = await storeData(formattedData)
            console.log(response.data)
            console.log(response)

            router.push(`/addimage/${response.data}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="mx-auto w-full max-w-[900px] space-y-8 rounded bg-white py-28">
            <h1 className="text-center text-[22px] font-semibold leading-7">
                Registrasi Data Usaha
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="form-label mb-2 font-medium">
                            Nama Usaha
                        </label>
                        <Input
                            {...register('name', {
                                required: 'Nama Usaha is required',
                            })}
                            required
                            type="text"
                            placeholder="Nama Usaha..."
                            className="rounded border border-gray-300 p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="form-label mb-2 font-medium">
                            Kategori Bisnis
                        </label>
                        <DropdownCheckbox
                            label="Kategori Bisnis"
                            name="category"
                            register={register}
                            options={[
                                { value: 'Makanan', label: 'Makanan' },
                                { value: 'Minuman', label: 'Minuman' },
                                {
                                    value: 'Makanan dan Minuman',
                                    label: 'Makanan dan Minuman',
                                },
                            ]}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="form-label mb-2 font-medium">
                            Alamat
                        </label>
                        <Input
                            {...register('business_address', {
                                required: 'Alamat is required',
                            })}
                            required
                            type="text"
                            placeholder="Alamat..."
                            className="rounded border border-gray-300 p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="form-label mb-2 font-medium">
                            No. Telpon
                        </label>
                        <Input
                            {...register('business_contact', {
                                required: 'No. Telpon is required',
                            })}
                            required
                            type="text"
                            placeholder="No. Telpon..."
                            className="rounded border border-gray-300 p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="form-label mb-2 font-medium">
                            Nama Kontak
                        </label>
                        <Input
                            {...register('contact_name', {
                                required: 'Nama Kontak is required',
                            })}
                            required
                            type="text"
                            placeholder="Nama Kontak..."
                            className="rounded border border-gray-300 p-2"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="form-label mb-2 font-medium">
                        Hari dan Jam Buka
                    </label>
                    {[
                        'senin',
                        'selasa',
                        'rabu',
                        'kamis',
                        'jumat',
                        'sabtu',
                        'minggu',
                    ].map((day) => (
                        <div key={day} className="flex items-center space-x-4">
                            <input
                                type="checkbox"
                                {...register(`opening_hours.${day}.open`)}
                                className="h-4 w-4"
                            />
                            <span className="capitalize">{day}</span>
                            <Input
                                {...register(`opening_hours.${day}.open_time`)}
                                type="text"
                                placeholder="Jam Buka"
                                className="flex-1 rounded border border-gray-300 p-2"
                            />
                            <Input
                                {...register(`opening_hours.${day}.close_time`)}
                                type="text"
                                placeholder="Jam Tutup"
                                className="flex-1 rounded border border-gray-300 p-2"
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="form-label mb-2 font-medium">
                            Layanan
                        </label>
                        <DropdownCheckbox
                            label="Layanan"
                            name="services"
                            register={register}
                            options={[
                                {
                                    value: 'Makan di Tempat',
                                    label: 'Makan di Tempat',
                                },
                                {
                                    value: 'Terima Pesanan',
                                    label: 'Terima Pesanan',
                                },
                            ]}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="form-label mb-2 font-medium">
                            Fasilitas
                        </label>
                        <DropdownCheckbox
                            label="Fasilitas"
                            name="facilities"
                            register={register}
                            options={[
                                { value: 'Parkir', label: 'Parkir' },
                                { value: 'Toilet', label: 'Toilet' },
                            ]}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="form-label mb-2 font-medium">
                            Pembayaran
                        </label>
                        <DropdownCheckbox
                            label="Pembayaran"
                            name="payment_methods"
                            register={register}
                            options={[
                                { value: 'Tunai', label: 'Tunai' },
                                {
                                    value: 'Non-Tunai',
                                    label: 'Non-Tunai (Transfer, QRIS)',
                                },
                            ]}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="form-label mb-2 font-medium">
                        Lokasi Titik
                    </label>
                    <div className="flex space-x-4">
                        <Input
                            {...register('latitude', {
                                required: 'Latitude is required',
                            })}
                            required
                            type="number"
                            step="0.000001"
                            placeholder="Latitude"
                            className="flex-1 rounded border border-gray-300 p-2"
                        />
                        <Input
                            {...register('longitude', {
                                required: 'Longitude is required',
                            })}
                            required
                            type="number"
                            step="0.000001"
                            placeholder="Longitude"
                            className="flex-1 rounded border border-gray-300 p-2"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="form-label mb-2 font-medium">
                            Rentang Harga
                        </label>
                        <Input
                            {...register('min_price', {
                                required: 'Harga Makanan is required',
                            })}
                            required
                            type="text"
                            placeholder="Harga Terendah..."
                            className="rounded border border-gray-300 p-2"
                        />
                        <Input
                            {...register('max_price', {
                                required: 'Harga Minuman is required',
                            })}
                            required
                            type="text"
                            placeholder="Harga Tertinggi..."
                            className="mt-2 rounded border border-gray-300 p-2"
                        />
                    </div>
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
