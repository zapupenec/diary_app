import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import styles from './checkbox.module.css';
import { clsx } from 'lib';

interface ICheckboxProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isValid?: boolean;
}

export const Checkbox: FC<ICheckboxProps> = ({ children, className, isValid = true, ...props }) => {
  return (
    <label className={clsx(className, styles.container)}>
      <input className={clsx(styles.input, styles['visually-hidden'])} type="checkbox" {...props} />
      <span className={clsx(styles.checkbox, isValid ? '' : styles.invalid)} />
      {children}
    </label>
  );
};
