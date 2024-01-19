import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './loader.module.css';
import { clsx } from 'lib';

interface ILoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Loader: FC<ILoaderProps> = ({ className, ...props }) => {
  return <div className={clsx(styles.loader, className)} {...props} />;
};
