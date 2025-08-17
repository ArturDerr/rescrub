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
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export interface IRegister {
  name: string
  surname: string
  lastname?: string
  email: string
  birthDate: Date
  password: string
}

export interface ILogin {
  email: string
  password: string
}


export interface IUser {
  id: number
  username: string
  email: string
}

export interface IRegisterResponse {
  user: IUser
  token: string
}

export interface ILoginResponse {
  access: string
  refresh: string
}

export interface IAuthStore {
  user: IUser | null
  token: string | null
  setAuth: (user: IUser, token: string) => void
  setToken: (token: string) => void
  logout: () => void
}