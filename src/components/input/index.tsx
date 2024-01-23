import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';

import styles from './input.module.css';
import { clsx } from 'lib';

interface IInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, IInputProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={clsx(className, styles.container)} {...props} />;
});
