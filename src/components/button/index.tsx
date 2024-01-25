import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import styles from './button.module.css';
import { clsx } from 'lib';

interface IButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  bgColor?: string;
}

export const Button: FC<IButtonProps> = ({ children, className, bgColor, ...props }) => (
  <button
    className={clsx(className, styles.container)}
    style={{ background: `${bgColor}` }}
    {...props}
  >
    {children}
  </button>
);
