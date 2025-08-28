import type { Transition, Variants } from "motion";
import type { AnimatePresenceProps } from "motion/react";

export type TextLoopProps = {
  children: React.ReactNode[]
  className?: string
  interval?: number
  transition?: Transition
  variants?: Variants
  onIndexChange?: (index: number) => void
  trigger?: boolean
  mode?: AnimatePresenceProps['mode']
};

export interface IDataStore {
    userEmail: string | null
    setUserEmail: (email: string) => void
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

export interface IRegister {
  firstName: string
  lastName: string
  middleName?: string
  email: string
  birthDate: Date
  password: string
}

export interface ILogin {
  email: string
  password: string
}


export interface IUser {
  userId: number
  email: string
}

export interface IRegisterResponse {
  userId: number
  email: string
}

export interface ILoginResponse {
  access: string
  refresh: string
}

export interface IAuthStore {
  userId: number | null
  email: string | null
  token: string | null
  setAuth: (userId: number, email: string) => void
  setToken: (token: string) => void
  logout: () => void
}