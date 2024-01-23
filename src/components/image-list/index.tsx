import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './image-list.module.css';
import { ImgWithLoader } from 'components/img-with-loader';

interface IImagesListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  images: {
    id: number | string;
    img: string;
  }[];
}

export const ImagesList: FC<IImagesListProps> = ({ images }) => {
  return (
    <ul className={styles.list}>
      {images?.map((image) => (
        <li key={`image_${image.id}`}>
          <ImgWithLoader className={styles.img} src={image.img} alt="Фото" />
        </li>
      ))}
    </ul>
  );
};
