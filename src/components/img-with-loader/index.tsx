import { Loader } from './loader';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useState } from 'react';

import styles from './img-with-loader.module.css';
import { clsx } from 'lib';

interface IImgWithLoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
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
      {!url ? <Loader /> : <img className={styles.image} src={url} alt={alt} />}
    </div>
  );
};
