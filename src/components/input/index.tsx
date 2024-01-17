import { DetailedHTMLProps, FC, InputHTMLAttributes, useEffect, useRef } from 'react';

import styles from './input.module.css';
import { clsx } from 'lib';

interface IInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input: FC<IInputProps> = ({ className, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return <input ref={inputRef} className={clsx(className, styles.container)} {...props} />;
};
