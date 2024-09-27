'use client'
import { Button, Input, Divider, Link, Spinner } from '@nextui-org/react'
import React, { useState } from 'react'
import PasswordInput from './PasswordInput'
import { navigate } from '../actions'
import { makeRequest } from '../request'
import { StatusCodes } from 'http-status-codes'


type FormValues = "email" | "username" | "password" | "confirmPassword"
interface RegisterForm {
    email: string;
    password: string;
    username: string;
    confirmPassword: string;
}
interface ErrorForm {
    email: string;
    password: string;
    username: string;
    confirmPassword: string;
}
const initialErrorState: ErrorForm = {
    "email": "",
    "password": "",
    "username": "",
    "confirmPassword": ""
}
const initialFormState: RegisterForm = {
    "email": "",
    "password": "",
    "confirmPassword": "",
    "username": ""
}
type RegisterProps = {
    changeAuthState: () => void
}
export default function Register({ changeAuthState }: RegisterProps) {
    const [formValues, setFormValues] = useState<RegisterForm>(initialFormState)
    const [formErrors, setFormErrors] = useState<ErrorForm>(initialErrorState)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const setErrors = (key: string, err: string) => {
        setFormErrors((prev) => ({
            ...prev,
            [key]: err
        }))
    }
    const onChangeValueHandler = (key: FormValues, e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prev) => ({
            ...prev,
            [key]: e.target.value
        }))
    }
    const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setFormErrors(initialErrorState)

        if (formValues.password !== formValues.confirmPassword) {
            setErrors("confirmPassword", "passwords don't match")
            return
        }


        setIsLoading(true)
        const res = await makeRequest("/users", "POST", JSON.stringify(formValues), false)
        if (res?.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
            for (var key in res?.body["errors"]) {
                setErrors(key, res?.body["errors"][key])
            }
            setIsLoading(false)
            return
        }
        setIsLoading(false)
        console.log(res)
        localStorage.setItem("token", res?.body?.token ?? "")
        navigate("/setup")
    }
    return (
        <div className='w-[40%] flex flex-col justify-center items-center'>
            <div>
                <h2 className='m-10 text-5xl font-extrabold'>Sign Up</h2>
            </div>
            <form className='flex flex-col space-y-2 w-[70%]'>
                <Input isInvalid={formErrors.email.length > 0} errorMessage={formErrors.email} type='email' label='Email' variant='bordered' onChange={(e) => onChangeValueHandler("email", e)} value={formValues["email"]} />
                <Input isInvalid={formErrors.username.length > 0} errorMessage={formErrors.username} label='Username' variant='bordered' onChange={(e) => onChangeValueHandler("username", e)} value={formValues["username"]} />
                <PasswordInput isInvalid={formErrors.password.length > 0} errorMessage={formErrors.password} label='Password' onChange={onChangeValueHandler} valueKey="password" value={formValues["password"]} />
                <PasswordInput isInvalid={formErrors.confirmPassword.length > 0} errorMessage={formErrors.confirmPassword} label='Confirm Password' onChange={onChangeValueHandler} valueKey="confirmPassword" value={formValues["confirmPassword"]} />
                {!isLoading ? <Button variant='shadow' className='bg-danger-300' onClick={onClickHandler}>Sign Up</Button> : <Spinner color='danger' />}
                <div>
                    <Divider className="my-4 mt-5" />
                    <p className='text-sm '>You already have an account? <Link onClick={changeAuthState} className='cursor-pointer text-sm font-bold text-danger-300'>Sign In</Link></p>
                </div>
            </form>
        </div>
    )
}