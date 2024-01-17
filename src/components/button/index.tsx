import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import styles from './button.module.css';
import { clsx } from 'lib';

interface IButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const Button: FC<IButtonProps> = ({ children, className, ...props }) => (
  <button className={clsx(className, styles.container)} {...props}>
    {children}
  </button>
);
