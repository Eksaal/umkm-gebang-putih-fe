'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function UmkmDataForm() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<any>({
        defaultValues: {
            name: '',
            category: '',
            productType: '',
            businessType: '',
            businessAddress: '',
            businessContact: '',
            contactName: '',
            openingDays: '',
            specialClosingDays: '',
            openingHours: '',
            services: '',
            paymentMethods: '',
            facilities: '',
            latitude: 0,
            longitude: 0,
            foodPrice: '',
            drinkPrice: '',
        },
    })

    const handleForm: SubmitHandler<any> = async (data) => {
        try {
            // Replace with your API call or any other logic to handle the form data
            console.log(data)
            router.refresh()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="mx-auto w-full max-w-[600px] space-y-[25px] rounded bg-white p-10">
            <h1 className="text-center text-[22px] font-semibold leading-7">
                Add Business Data
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
                <div>
                    <label className="form-label">Business Name</label>
                    <Input
                        {...register('name')}
                        type="text"
                        placeholder="Business Name..."
                    />
                </div>
                <div>
                    <label className="form-label">Category</label>
                    <Input
                        {...register('category')}
                        type="text"
                        placeholder="Category..."
                    />
                </div>
                <div>
                    <label className="form-label">Product Type</label>
                    <Input
                        {...register('productType')}
                        type="text"
                        placeholder="Product Type..."
                    />
                </div>
                <div>
                    <label className="form-label">Business Type</label>
                    <Input
                        {...register('businessType')}
                        type="text"
                        placeholder="Business Type..."
                    />
                </div>
                <div>
                    <label className="form-label">Business Address</label>
                    <Input
                        {...register('businessAddress')}
                        type="text"
                        placeholder="Business Address..."
                    />
                </div>
                <div>
                    <label className="form-label">Business Contact</label>
                    <Input
                        {...register('businessContact')}
                        type="text"
                        placeholder="Business Contact..."
                    />
                </div>
                <div>
                    <label className="form-label">Contact Name</label>
                    <Input
                        {...register('contactName')}
                        type="text"
                        placeholder="Contact Name..."
                    />
                </div>
                <div>
                    <label className="form-label">Opening Days</label>
                    <Input
                        {...register('openingDays')}
                        type="text"
                        placeholder="Opening Days..."
                    />
                </div>
                <div>
                    <label className="form-label">Special Closing Days</label>
                    <Input
                        {...register('specialClosingDays')}
                        type="text"
                        placeholder="Special Closing Days..."
                    />
                </div>
                <div>
                    <label className="form-label">Opening Hours</label>
                    <Input
                        {...register('openingHours')}
                        type="text"
                        placeholder="Opening Hours..."
                    />
                </div>
                <div>
                    <label className="form-label">Services</label>
                    <Input
                        {...register('services')}
                        type="text"
                        placeholder="Services..."
                    />
                </div>
                <div>
                    <label className="form-label">Payment Methods</label>
                    <Input
                        {...register('paymentMethods')}
                        type="text"
                        placeholder="Payment Methods..."
                    />
                </div>
                <div>
                    <label className="form-label">Facilities</label>
                    <Input
                        {...register('facilities')}
                        type="text"
                        placeholder="Facilities..."
                    />
                </div>
                <div>
                    <label className="form-label">Latitude</label>
                    <Input
                        {...register('latitude')}
                        type="number"
                        step="0.000001"
                        placeholder="Latitude..."
                    />
                </div>
                <div>
                    <label className="form-label">Longitude</label>
                    <Input
                        {...register('longitude')}
                        type="number"
                        step="0.000001"
                        placeholder="Longitude..."
                    />
                </div>
                <div>
                    <label className="form-label">Food Price Range</label>
                    <Input
                        {...register('foodPrice')}
                        type="text"
                        placeholder="Food Price Range..."
                    />
                </div>
                <div>
                    <label className="form-label">Drink Price Range</label>
                    <Input
                        {...register('drinkPrice')}
                        type="text"
                        placeholder="Drink Price Range..."
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
