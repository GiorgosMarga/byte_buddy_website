import { HomeIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button, Input, Spinner, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import { navigate } from '../actions'
import MyAvatar from '../components/Avatar'
import { makeRequest } from '../request'
import { StatusCodes } from 'http-status-codes'
import { useQuery } from 'react-query'
import ProfileSkeleton from './ProfileSkeleton'

type Props = {
    user: User
}
type Form = {
    bio?: string
    country?: string
    city?: string
}
const UserBanner = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<Form>({})
    const [formErrors, setFormErrors] = useState({ bio: "", country: "", city: "" })

    const { data: user, refetch } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await makeRequest("/user_info", "GET", null, true)
            return res.body.user_info as User
        },
        onSuccess: (user) => {
            setForm({ bio: user.bio, country: user.geolocation.country, city: user.geolocation.city })
        }
    })




    const setErrors = (key: string, value: string) => {
        setFormErrors((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (key === "bio" && e.target.value.length > 5000) {
            return
        }
        setForm((prev) => ({
            ...prev,
            [key]: e.target.value
        }))
    }



    const onPressHandler = async (e: any) => {
        setIsLoading(true)
        const res = await makeRequest("/user_info", "PUT", JSON.stringify(form), true)
        if (res.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
            for (var key in res.body["errors"]) {
                setErrors(key, res.body["errors"][key])
            }
        } else if (res.statusCode === StatusCodes.OK) {
            refetch()
            setIsEdit(false)

        }
        setIsLoading(false)
    }

    if (!user) {
        return <ProfileSkeleton />
    }

    return (
        <div className="w-[100%] md:w-[30%] h-[100%] rounded-3xl flex flex-col p-5">
            <div className="flex mt-5 justify-between pl-5">
                <HomeIcon className='w-5 h-5 text-danger-300 cursor-pointer hover:scale-105 duration-150 ease-linear transition-all' onClick={async () => await navigate("/")}></HomeIcon>
                {isEdit ? <XMarkIcon className="w-5 h-5 text-danger-300 cursor-pointer hover:scale-105 duration-150 ease-linear transition-all " onClick={() => setIsEdit((prev) => !prev)} /> :
                    <PencilSquareIcon className="w-5 h-5 text-danger-300 cursor-pointer hover:scale-105 duration-150 ease-linear transition-all " onClick={() => setIsEdit((prev) => !prev)} />
                }
            </div>
            <div className="flex flex-col items-center pt-5">
                <MyAvatar name={user.firstname} avatar={user.avatar} className='md:w-[150px] md:h-[150px] w-[100px] h-[100px]' />
                <p className="font-semibold text-lg mt-2">{`${user?.firstname} ${user?.lastname}`}</p>
            </div>
            <div className="p-5 flex flex-col">
                <div className='relative pb-5'>
                    <Textarea
                        errorMessage={formErrors?.bio}
                        isInvalid={formErrors.bio.length > 0}
                        disableAutosize
                        disabled={!isEdit}
                        onChange={(e) => onChangeHandler(e, "bio")}
                        value={isEdit ? form?.bio : user.bio}
                        classNames={{
                            base: "h-[100%]",
                            input: "h-[50%] min-h-[100px]",
                            label: "text-lg pl-1 tracking-wide"
                        }}
                    />
                    {isEdit && <p className='absolute bottom-0 right-2'>{`${form.bio?.length}/5000`}</p>}
                </div>
                {isEdit ? <div className='flex space-x-2 mt-2'>
                    <Input label='Country' variant='bordered'
                        errorMessage={formErrors.country}
                        isInvalid={formErrors.country.length > 0}
                        onChange={(e) => onChangeHandler(e, "country")}
                        value={form.country} />
                    <Input label='City' variant='bordered'
                        errorMessage={formErrors.city}
                        isInvalid={formErrors.city.length > 0}
                        onChange={(e) => onChangeHandler(e, "city")}
                        value={form.city} />
                </div> : <>
                    <p className="font-light mt-2">{`Country: ${isEdit ? form?.country : user?.geolocation.country}`}</p>
                    <p className="font-light">{`City: ${isEdit ? form?.city : user?.geolocation.city}`}</p>
                </>}
                {isEdit ? isLoading ? <Spinner color='danger' className='mt-10' /> : <Button className='bg-danger mt-10 p-5' onPress={(e) => onPressHandler(e)}>Edit</Button> : null}
            </div>
        </div>
    )
}

export default UserBanner