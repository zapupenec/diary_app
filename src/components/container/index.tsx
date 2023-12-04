import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './styles.module.css';

interface IContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Container: FC<IContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
