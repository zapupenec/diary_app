import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

import styles from './selector.module.css';
import { clsx } from 'lib';
import { Icon } from 'components';
import { Option } from './option';

interface ISelectorProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  placeholder: any;
  defaultValue: string | number;
  values: (string | number)[];
  displayValues: (string | number)[];
}

export const Selector: FC<ISelectorProps> = ({
  className,
  placeholder,
  defaultValue,
  values,
  displayValues,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const selectortRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  };

  useEffect(() => {
    const { current } = selectortRef;
    if (!current) return;

    const handleClickPast = ({ target }: MouseEvent) => {
      if (!current.contains(target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handleClickPast);

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Enter') {
        setIsOpen((prev) => !prev);
      }
    };
    current.addEventListener('keydown', handleEnterKeyDown);

    return () => {
      window.removeEventListener('click', handleClickPast);
      current.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, []);

  return (
    <div
      className={clsx(className, styles.container)}
      onClick={handleClick}
      ref={selectortRef}
      role="button"
      tabIndex={0}
    >
      <div className={styles.placeholder}>
        {value === defaultValue ? placeholder : value}
      </div>
      <div className={styles.arrow}>
        <Icon name="chevron-down" />
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {[placeholder, ...displayValues].map((displayValues, i) => {
            const key = i === 0 ? 'defaultValue' : displayValues;
            return (
              <Option
                key={key}
                setIsOpen={setIsOpen}
                setValue={setValue}
                displayValue={displayValues}
                value={i === 0 ? defaultValue : values[i - 1]}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
