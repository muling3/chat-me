import { ChangeEvent } from "react"

export interface ButtonProps {
    label: string
    type: "button" | "submit" | "reset" 
    styles?: string
    link?: string
}

export interface InputProps {
    type: string
    name?: string
    styles?: string
    placeholder?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}