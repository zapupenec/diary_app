import { DetailedHTMLProps, Dispatch, FC, useEffect, useRef } from 'react';

import styles from './option.module.css';

interface IOptionProps
  extends DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  displayValue: string;
  value: string;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  onClickOption: (value: string) => void;
}

export const Option: FC<IOptionProps> = ({
  value,
  displayValue,
  setIsOpen,
  onClickOption,
  ...props
}) => {
  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick = (selectedValue: any) => () => {
    onClickOption(selectedValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const { current } = optionRef;
    if (!current) return;
    const handleEnterKeyDown = (event: any) => {
      if (document.activeElement === current && event.code === 'Enter') {
        onClickOption(value);
      }
    };

    current.addEventListener('keydown', handleEnterKeyDown);
    return () => {
      current.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, [onClickOption, value]);

  return (
    <li
      className={styles.container}
      onClick={handleClick(value)}
      tabIndex={0}
      ref={optionRef}
      role="button"
      {...props}
    >
      {displayValue}
    </li>
  );
};
