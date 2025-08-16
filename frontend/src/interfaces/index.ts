import type { Transition, Variants } from "motion";
import type { AnimatePresenceProps } from "motion/react";

export type TextLoopProps = {
  children: React.ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
  trigger?: boolean;
  mode?: AnimatePresenceProps['mode'];
};

export interface IDataStore {
    userEmail: string | null
    setUserEmail: (email: string) => void
}

export interface IInputProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  inputRef?: React.Ref<HTMLInputElement>;
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}