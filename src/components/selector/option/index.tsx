import { DetailedHTMLProps, Dispatch, FC, useEffect, useRef } from 'react';

import styles from './styles.module.css';

interface IOptionProps
  extends DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  displayValue: string | number;
  value: string | number;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  setValue: Dispatch<React.SetStateAction<string | number>>;
}

export const Option: FC<IOptionProps> = ({ value, displayValue, setIsOpen, setValue }) => {
  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick = (selectedValue: any) => () => {
    setValue(selectedValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const { current } = optionRef;
    if (!current) return;
    const handleEnterKeyDown = (event: any) => {
      if (document.activeElement === current && event.code === 'Enter') {
        setValue(value);
      }
    };

    current.addEventListener('keydown', handleEnterKeyDown);
    return () => {
      current.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, [setValue, value]);

  return (
    <li className={styles.option} onClick={handleClick(value)} tabIndex={0} ref={optionRef}>
      {displayValue}
    </li>
  );
};
