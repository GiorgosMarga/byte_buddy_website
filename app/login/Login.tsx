'use client'
import { Button, Input, Divider, Link, Spinner } from '@nextui-org/react'
import React, { useState } from 'react'
import PasswordInput from './PasswordInput'
import { navigate } from '../actions'
import { makeRequest } from '../request'
import { StatusCodes } from 'http-status-codes'


type FormValues = "email" | "username" | "password" | "confirmPassword"
interface LoginForm {
    email: string;
    password: string;
}
interface ErrorForm {
    email: string;
    password: string;
    credentials: string;
}
const initialErrorState: ErrorForm = {
    "email": "",
    "password": "",
    "credentials": "",
}
const initialFormState: LoginForm = {
    "email": "",
    "password": ""
}
type LoginProps = {
    changeAuthState: () => void
}
const Login = ({ changeAuthState }: LoginProps) => {
    const [formValues, setFormValues] = useState<LoginForm>(initialFormState)
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
        setIsLoading(true)
        const res = await makeRequest("/users/login", "POST", JSON.stringify(formValues), false)
        if (res.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
            for (var key in res.body["errors"]) {
                setErrors(key, res.body["errors"][key])
            }
        } else if (res.statusCode === StatusCodes.UNAUTHORIZED) {
            setErrors("credentials", "invalid credentials.")
        } else if (res.statusCode === StatusCodes.OK) {
            localStorage.setItem("token", res.body.token)
            await navigate("/")
        }
        setIsLoading(false)

    }

    return (
        <div className='min-w-[500px] w-[100%] md:w-[50%]  flex flex-col justify-center items-center'>
            <div>
                <h2 className='m-10 text-5xl font-extrabold'>Sign In</h2>
            </div>
            <form className='flex flex-col space-y-2 w-[70%]'>
                <Input isInvalid={formErrors.email.length > 0} errorMessage={formErrors.email} type='email' label='Email' variant='bordered' onChange={(e) => onChangeValueHandler("email", e)} value={formValues["email"]} />
                <PasswordInput isInvalid={formErrors.password.length > 0} errorMessage={formErrors.password} label='Password' onChange={onChangeValueHandler} valueKey="password" value={formValues["password"]} />
                {formErrors.credentials.length > 0 ? <p className='text-sm text-danger pb-1'>{formErrors.credentials}</p> : null}
                {!isLoading ? <Button variant='shadow' className='bg-danger-300' onClick={onClickHandler}>Log In</Button> : <Spinner color='danger' />}
                <div>
                    <Divider className="my-4 mt-5" />
                    <p className='text-sm'>You don't have an account? <Link onClick={changeAuthState} className='cursor-pointer text-sm font-bold text-danger-300'>Sign up</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login