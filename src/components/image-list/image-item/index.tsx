import { DetailedHTMLProps, FC, HTMLAttributes, ReactEventHandler, useState } from 'react';

import styles from './image-item.module.css';
import { ImgWithLoader } from 'components/img-with-loader';
import { clsx } from 'lib';
import { TImage } from 'types';

interface IImageItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  image: TImage;
  status?: 'active' | 'inactive' | 'regular';
}

export const ImageItem: FC<IImageItemProps> = ({ image, onClick, status = 'regular' }) => {
  const [ratio, setRatio] = useState(0);

  const handleLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    const ratio =
      (e.target as HTMLImageElement).naturalHeight / (e.target as HTMLImageElement).naturalWidth;
    setRatio(ratio);
  };

  return (
    <li
      className={clsx(
        styles.container,
        ratio > 1 ? styles.vertical : '',
        status === 'active' ? styles.active : '',
        status === 'inactive' ? styles.inactive : '',
      )}
    >
      <ImgWithLoader
        onClick={onClick}
        src={image.url}
        alt={image.description}
        onLoad={handleLoad}
      />
    </li>
  );
};
