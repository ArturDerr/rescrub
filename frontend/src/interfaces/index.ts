import type { Transition, Variants } from "motion";
import type { AnimatePresenceProps } from "motion/react";

// анимация
export type TextLoopProps = {
  children: React.ReactNode[]
  className?: string
  interval?: number
  transition?: Transition
  variants?: Variants
  onIndexChange?: (index: number) => void
  trigger?: boolean
  mode?: AnimatePresenceProps['mode']
}

export interface IInputProps {
  type: string
  id: string
  name: string
  placeholder: string
  inputRef?: React.Ref<HTMLInputElement>
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// типы для регистрации

export interface IRegister {
  email: string
  phone?: string
  password: string
  firstName: string
  lastName: string
  middleName?: string
  birthDate?: string
}

export interface IRegisterResponse {
  message: string
  userId: number
  email: string
}

// типы для входа

export interface ILogin {
  phone?: string
  email: string
  password: string
}

export interface ILoginResponse {
  access_token: string
  token_type: string
  expires_in: number
  user_id: number
  email: string
}

// типы для сброса пароля

export interface IForgotPassword {
  email: string
}

export interface IForgotPasswordResponse {
  message: string
}