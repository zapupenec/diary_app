import { DetailedHTMLProps, FC, ImgHTMLAttributes, useEffect, useState } from 'react';

import styles from './img-with-loader.module.css';
import { Loader } from './loader';
import { clsx } from 'lib';

export interface IImgWithLoaderProps
  extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  src: string;
  alt: string;
}

export const ImgWithLoader: FC<IImgWithLoaderProps> = ({ className, src, alt, ...props }) => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    fetch(src)
      .then((response) => response.blob())
      .then((image) => {
        setUrl(URL.createObjectURL(image));
      });
  }, [src]);

  return (
    <div className={clsx(className, styles.container)}>
      {!url ? <Loader /> : <img className={styles.image} src={url} alt={alt} {...props} />}
    </div>
  );
};
