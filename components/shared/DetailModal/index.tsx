import * as React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useUmkm } from '@/hooks/useUMKM'
import Rating from '../Rating'
import * as Tabs from '@radix-ui/react-tabs'
import { FaPhoneVolume, FaMoneyBill, FaCheck, FaX } from 'react-icons/fa6'
import OpeningHours from '../OpeningHours'

interface IDetilModalProps {
    readonly id: number
    isOpen: boolean
    onClose: () => void
}

const DetilModal: React.FC<IDetilModalProps> = ({ id, isOpen, onClose }) => {
    const { getUmkm } = useUmkm()
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const cleanType = (type: string) => type.replace(/[\[\]"]/g, '').trim()

    const parseAndCleanArray = (arrayString: string) => {
        try {
            return JSON.parse(arrayString).map((item: string) => item.trim())
        } catch (error) {
            console.error('Error parsing array string:', error)
            return []
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await getUmkm(id)
                const cleanedData = {
                    ...response.data,
                    category: cleanType(response.data.category),
                    services: parseAndCleanArray(response.data.services),
                    payment_methods: parseAndCleanArray(
                        response.data.payment_methods,
                    ),
                    facilities: parseAndCleanArray(response.data.facilities),
                }
                setData(cleanedData)
            } catch (error) {
                console.error('Error fetching UMKM data:', error)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchData()
        }
    }, [id])

    if (loading) {
        return <div></div>
    }

    if (!data) {
        return <div>No data found</div>
    }
    const hoursData = JSON.parse(data.opening_hours)
    return (
        <div
            className={`absolute left-[560px] top-20 h-[89vh] w-[540px] overflow-hidden rounded-lg bg-white shadow-lg ${isOpen ? '' : 'hidden'}`}
        >
            {data.pictures.length > 0 && (
                <Image
                    src={`http://localhost:3333/${data.pictures[0].picture_path}`}
                    alt="hero-image"
                    height={200}
                    width={540}
                    className="h-[200px] w-[540px] object-cover"
                />
            )}
            <h3 className="absolute left-4 top-4 rounded-md bg-blue-400 px-3 py-2 text-white">
                {data.category}
            </h3>
            <FaX
                size={30}
                onClick={onClose}
                className="absolute right-4 top-4 cursor-pointer rounded-full p-1 text-xl text-white hover:text-blue-300"
            />

            <div className="mx-auto px-10 py-2">
                <h1 className="text-2xl">{data.name}</h1>
                <p className="text-sm">{data.business_address}</p>
                <div className="flex flex-row items-center gap-2 text-lg">
                    <h4>4.6</h4>
                    <Rating initialValue={4.6} disabled />
                    <h4>(12)</h4>
                </div>
            </div>
            <div className="mx-auto -mt-5 px-5">
                <Tabs.Root
                    defaultValue="about"
                    className="h-[calc(89vh-200px)] px-5 pt-3"
                >
                    <Tabs.List className="flex border-b border-gray-200">
                        <Tabs.Trigger
                            value="about"
                            className="flex-1 py-2 text-center text-gray-500 hover:text-blue-500 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-500"
                        >
                            Tentang
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="documents"
                            className="flex-1 py-2 text-center text-gray-500 hover:text-blue-500 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-500"
                        >
                            Ulasan
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="gallery"
                            className="flex-1 py-2 text-center text-gray-500 hover:text-blue-500 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-500"
                        >
                            Galeri
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content
                        value="about"
                        className="h-[calc(50vh-40px)] space-y-1 overflow-y-auto pt-2"
                    >
                        <h3 className="text-lg">Informasi Umum</h3>
                        <div className="flex items-center gap-x-4">
                            <FaPhoneVolume className="text-green-500" />{' '}
                            {data.business_contact}
                        </div>
                        <OpeningHours days={hoursData} />
                        <div className="mb-2 flex items-center gap-x-4">
                            <FaMoneyBill className="text-green-500" /> Rp.{' '}
                            {data.min_price} - Rp. {data.max_price}
                        </div>
                        <hr className="pt-2" />
                        <h3 className=" pt-2 text-lg">Layanan</h3>
                        <div className="grid grid-cols-2">
                            {data.services.map(
                                (service: string, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-x-4"
                                    >
                                        <FaCheck className="text-green-500" />{' '}
                                        {service}
                                    </div>
                                ),
                            )}
                        </div>
                        <hr className="py-2" />
                        <h3 className="pt-2 text-lg">Pembayaran</h3>
                        <div className="grid grid-cols-2">
                            {data.payment_methods.map(
                                (payment: string, index: number) => (
                                    <div
                                        key={index}
                                        className="col-span-1 flex items-center gap-x-4"
                                    >
                                        <FaCheck className="text-green-500" />{' '}
                                        {payment}
                                    </div>
                                ),
                            )}
                        </div>
                    </Tabs.Content>

                    <Tabs.Content
                        value="documents"
                        className="h-[calc(50vh-40px)] space-y-1 overflow-y-auto pt-2"
                    >
                        <h2>JSANODA</h2>
                    </Tabs.Content>

                    <Tabs.Content
                        value="gallery"
                        className="h-[calc(50vh-40px)] space-y-1 overflow-y-auto pt-2"
                    >
                        <h3 className="pb-3 pt-5 text-lg">Foto</h3>
                        <div className="mx-auto">
                            {data.pictures.length > 0 && (
                                <Image
                                    src={`http://localhost:3333/${data.pictures[0].menu_picture_path}`}
                                    alt="gallery-image"
                                    height={160}
                                    width={120}
                                    className="h-[160px] w-[120px] object-cover"
                                />
                            )}
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    )
}

export default DetilModal
