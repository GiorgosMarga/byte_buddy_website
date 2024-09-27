'use client'
import React from "react";
import {Input} from "@nextui-org/react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";

type FormValues = "email" | "username" | "password" | "confirmPassword" 

type PropsType = {
  label: string;
  value: string;
  onChange: (key: FormValues, e: React.ChangeEvent<HTMLInputElement>) => void;
  valueKey: FormValues;
  isInvalid?: boolean;
  errorMessage?: string;
}
export default function PasswordInput({label, value, onChange, valueKey, isInvalid, errorMessage}: PropsType) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      label={label}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      variant="bordered"
      value={value}
      onChange={(e) => onChange(valueKey,e) }
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
}
