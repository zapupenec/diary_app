import { AnchorHTMLAttributes, DetailedHTMLProps, FC, MouseEvent } from 'react';

import styles from './logo.module.css';
import { Icon } from 'components/icon';

interface ILogoProps
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

export const Logo: FC<ILogoProps> = () => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <a href="/" className={styles.container} onClick={handleClick}>
      <span className={styles.icon}>
        <Icon name="trees" />
      </span>
      <span className={styles.text}>Дневник</span>
    </a>
  );
};
