import { FC, MouseEvent } from 'react';

import styles from './styles.module.css';
import { Icon } from 'components/icon';

export const Logo: FC = () => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <a href="/" className={styles.logo} onClick={handleClick}>
      <span className={styles.icon}>
        <Icon name="trees" />
      </span>
      <h1 className={styles.text}>Дневник</h1>
    </a>
  );
};
