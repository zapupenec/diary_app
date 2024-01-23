import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './layout.module.css';
import { Header } from 'components';

interface IContainer extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Layout: FC<IContainer> = ({ children }) => {
  return (
    <>
      <Header className={styles.header} />
      <div className={styles.container}>{children}</div>
    </>
  );
};
