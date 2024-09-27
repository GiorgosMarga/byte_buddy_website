'use client'
import { Input, Textarea, Button, Slider, DateValue, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { DatePicker } from "@nextui-org/date-picker";
import Map from './Map'
import { navigate } from '../actions'
import { makeRequest } from '../request';
import { StatusCodes } from 'http-status-codes';


type FormValues = {
    bio: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    lat: number;
    lng: number;
    radius: number;
    birth_date: DateValue | null
}

type ErrorValues = {
    bio: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    birth_date: string;
}
const initialState: FormValues = {
    bio: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    lat: 0,
    lng: 0,
    radius: 10,
    birth_date: null,
}
const formErrors: ErrorValues = {
    bio: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    birth_date: "",
}
type allowedFormValues = "bio" | "firstName" | "lastName" | "country" | "city" | "radius" | "lat" | "lng" | "birth_date"
export default function SetupPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [formValues, setFormValues] = useState(initialState)
    const [errorValues, setErrorValues] = useState(formErrors)

    const setErrors = (key: string, err: string) => {
        setErrorValues((prev) => ({
            ...prev,
            [key]: err
        }))
    }

    const changeFormValue = (key: allowedFormValues, value: string | number | Date) => {
        setFormValues((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: allowedFormValues) => {
        changeFormValue(key, e.target.value)
    }

    const onChangeRadiusHandler = (e: number | number[]) => {
        setFormValues((prev) => ({
            ...prev,
            radius: e as number
        }))
    }

    const onSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsLoading(true)
        const res = await makeRequest("/user_info", "POST", JSON.stringify(formValues), true)
        setIsLoading(false)

        if (res?.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
            for (var key in res?.body["errors"]) {
                setErrors(key, res?.body["errors"][key])
            }
        } else if (res?.statusCode === StatusCodes.OK) {
            navigate("/")
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-[95%] h-[90%] rounded-xl bg-gray-950/50 shadow-2xl flex justify-center items-center'>
                <div className='w-[60%] h-[100%] rounded-xl '>
                    <form className='flex flex-col h-full p-10 space-y-5'>
                        <div>
                            <Textarea
                                errorMessage={errorValues.bio}
                                isInvalid={errorValues.bio.length > 0}
                                label="Bio"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Enter your bio"
                                disableAutosize
                                onChange={(e) => onChangeHandler(e, "bio")}
                                value={formValues.bio}
                                classNames={{
                                    base: "h-[100%]",
                                    input: "h-[50%] min-h-[100px]",
                                    label: "font-bold text-lg pl-1 tracking-wide"
                                }}
                            />
                            <p className='-mt-2 self-end w-full items-end flex justify-end pr-1 text-sm'>{`${formValues.bio.length}/5000`}</p>
                        </div>
                        <div className='flex space-x-5' >
                            <Input label='First Name' variant='bordered'
                                errorMessage={errorValues.firstName}
                                isInvalid={errorValues.firstName.length > 0} onChange={(e) => onChangeHandler(e, "firstName")} value={formValues.firstName} />
                            <Input label='Last Name' variant='bordered'
                                errorMessage={errorValues.lastName}
                                isInvalid={errorValues.lastName.length > 0} onChange={(e) => onChangeHandler(e, "lastName")} value={formValues.lastName} />
                        </div>
                        <DatePicker label="Birth date" variant="bordered"
                            isInvalid={errorValues.birth_date.length > 0}
                            errorMessage={errorValues.birth_date}
                            onChange={(e) => {
                                const newDate = new Date()
                                newDate.setMonth(e.month - 1)
                                newDate.setDate(e.day)
                                newDate.setFullYear(e.year)
                                changeFormValue("birth_date", newDate)
                            }
                            } />
                        <div className='flex space-x-5' >
                            <Input label='Country' variant='bordered'
                                errorMessage={errorValues.country}
                                isInvalid={errorValues.country.length > 0} onChange={(e) => onChangeHandler(e, "country")} value={formValues.country} />
                            <Input label='City' variant='bordered'
                                errorMessage={errorValues.city}
                                isInvalid={errorValues.city.length > 0} onChange={(e) => onChangeHandler(e, "city")} value={formValues.city} />
                        </div>
                        <Slider
                            color='danger'
                            label="Radius (km)"
                            step={1}
                            maxValue={100}
                            minValue={10}
                            defaultValue={20}
                            className="max-w-md"
                            value={formValues.radius}
                            onChange={onChangeRadiusHandler}
                        />
                        <div className='flex w-full items-center justify-center'>
                            {!isLoading ? <Button color='danger' variant='shadow' className='w-[100%] mt-10' onClick={onSubmitHandler}>Ready</Button> : <Spinner color='danger' />}
                        </div>
                    </form>
                </div>
                <div className='w-[40%] h-[100%] bg-yello-900'>
                    {formValues.country.length > 0 ? <div className='transition-all ease-in duration-150 h-full w-full animate-appearance-in'><Map radius={formValues.radius * 500} onChangePosition={changeFormValue} /></div> : null}
                </div>
            </div>
        </div>
    )
}
