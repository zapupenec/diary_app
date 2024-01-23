import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import styles from './logo.module.css';
import { Icon } from 'components/icon';

interface ILogoProps
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

export const Logo: FC<ILogoProps> = (props) => {
  return (
    <a href="/" className={styles.container} {...props}>
      <div className={styles.icon}>
        <Icon name="trees" />
      </div>
      <span className={styles.text}>Дневник</span>
    </a>
  );
};
