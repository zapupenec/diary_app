import { DetailedHTMLProps, FC } from 'react';
import styles from './styles.module.css';
import { clsx } from 'lib';

interface IButtonProps
  extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const Button: FC<IButtonProps> = ({ children, className, ...props }) => (
  <button className={clsx(className, styles.button)} {...props}>
    {children}
  </button>
);
