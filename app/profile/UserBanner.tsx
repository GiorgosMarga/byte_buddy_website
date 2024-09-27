import { HomeIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button, Input, Spinner, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import { navigate } from '../actions'

type Props = {
    user: User | null
}
type Form = {
    bio?: string
    country?: string
    city?: string
}
const UserBanner = ({ user }: Props) => {
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<Form>({ bio: user?.bio, country: user?.geolocation.country, city: user?.geolocation.city })
    const [formErrors, setFormErrors] = useState({ bio: "", country: "", city: "" })

    const setErrors = (key: string, value: string) => {
        setFormErrors((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: e.target.value
        }))
    }



    const onPressHandler = async (e: any) => {
        setIsLoading(true)
        try {
            console.log(form)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/user_info`, {
                method: "PUT",
                body: JSON.stringify(form),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                mode: "cors"
            })
            if (!res.ok) {
                throw new Error("error while making the request")
            }
            const body = await res.json()
            if (res.status === 422) {
                for (var key in body["errors"]) {
                    setErrors(key, body["errors"][key])
                }
            } else if (res.status === 200) {
                setIsEdit(false)
            }
        } catch (err) {
            console.error(err)
        }
        setIsLoading(false)
    }

    return (
        <div className="w-[30%] h-[100%] rounded-3xl flex flex-col">
            <div className="flex mt-5 justify-between pl-5">
                <HomeIcon className='w-5 h-5 text-danger-300 cursor-pointer hover:scale-105 duration-150 ease-linear transition-all' onClick={async () => await navigate("/")}></HomeIcon>
                {isEdit ? <XMarkIcon className="w-5 h-5 text-danger-300 cursor-pointer hover:scale-105 duration-150 ease-linear transition-all " onClick={() => setIsEdit((prev) => !prev)} /> :
                    <PencilSquareIcon className="w-5 h-5 text-danger-300 cursor-pointer hover:scale-105 duration-150 ease-linear transition-all " onClick={() => setIsEdit((prev) => !prev)} />
                }
            </div>
            <div className="flex flex-col items-center pt-5">
                <div className="w-[150px] h-[150px] mb-5 bg-danger-300 rounded-full cursor-pointer" />
                <p className="font-light -mt-3">{`@${user?.username}`}</p>
                <p className="font-semibold text-lg mt-2">{`${user?.firstName} ${user?.lastName}`}</p>
            </div>
            <div className="p-5 flex flex-col">
                <Textarea
                    errorMessage={formErrors?.bio}
                    isInvalid={formErrors.bio.length > 0}
                    disableAutosize
                    disabled={!isEdit}
                    onChange={(e) => onChangeHandler(e, "bio")}
                    value={form?.bio}
                    classNames={{
                        base: "h-[100%]",
                        input: "h-[50%] min-h-[100px]",
                        label: "text-lg pl-1 tracking-wide"
                    }}
                />
                {isEdit ? <div className='flex space-x-2 mt-2'>
                    <Input label='Country' variant='bordered'
                        errorMessage={formErrors.country}
                        isInvalid={formErrors.country.length > 0}
                        onChange={(e) => onChangeHandler(e, "country")}
                        value={form.country} />
                    <Input label='City' variant='bordered'
                        errorMessage={formErrors.country}
                        isInvalid={formErrors.country.length > 0}
                        onChange={(e) => onChangeHandler(e, "city")}
                        value={form.city} />
                </div> : <>
                    <p className="font-light mt-2">{`Country: ${form?.country || user?.geolocation.country}`}</p>
                    <p className="font-light">{`City: ${form?.city || user?.geolocation.city}`}</p>
                </>}
                {isEdit ? isLoading ? <Spinner color='danger' className='mt-10' /> : <Button className='bg-danger mt-10 p-5' onPress={(e) => onPressHandler(e)}>Edit</Button> : null}
            </div>
        </div>
    )
}

export default UserBanner