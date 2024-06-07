import React, { useState, ChangeEvent, FormEvent } from 'react'
import Rating from '../Rating'
import { FaX } from 'react-icons/fa6'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUmkm } from '@/hooks/useUMKM'

interface ModalFormProps {
    closeModal: () => void
    idUmkm: number
}

const ModalForm: React.FC<ModalFormProps> = ({ closeModal, idUmkm }) => {
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const { postReview } = useUmkm()

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleRatingChange = (newRating: number) => {
        setRating(newRating)
    }

    const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        let data = {
            name: name,
            rating: rating,
            comment: comment,
            umkmDataId: idUmkm,
        }
        postReview(data)
        closeModal()
    }

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="relative flex min-h-screen items-center justify-center">
                <div className="relative w-96 rounded bg-white p-8 shadow-lg">
                    <FaX
                        className="absolute right-0 top-0 cursor-pointer p-2 text-green-400"
                        size={35}
                        onClick={closeModal}
                    />
                    <h2 className="text-lg font-semibold">
                        Tambahkan Ulasan & Rating
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="mb-3 mt-5 flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Berikan Rating :
                            </label>
                            <Rating
                                initialValue={rating}
                                onChange={handleRatingChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nama:
                            </label>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="comment"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Comment:
                            </label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={handleCommentChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <Button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-400"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalForm
