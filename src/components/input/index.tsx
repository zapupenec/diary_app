import { DetailedHTMLProps, FC, useEffect, useRef } from 'react';

import styles from './styles.module.css';
import { clsx } from 'lib';

interface IInput
  extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input: FC<IInput> = ({ className, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return <input ref={inputRef} className={clsx(className, styles.input)} {...props} />;
};
