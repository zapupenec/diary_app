import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './image-list.module.css';
import { ImgWithLoader } from 'components/img-with-loader';
import { clsx } from 'lib';

interface IImagesListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  images: {
    id: number;
    url: string;
  }[];
  onClickItem: (value: string) => void;
  selectedImg: string;
}

export const ImagesList: FC<IImagesListProps> = ({
  images,
  onClickItem = () => {},
  selectedImg,
}) => {
  const handleClickItem = (value: string) => () => {
    if (selectedImg === value) {
      onClickItem('');
      return;
    }

    onClickItem(value);
  };

  return (
    <ul className={styles.list}>
      {images?.map((image) => (
        <li
          className={clsx(
            styles.item,
            selectedImg !== '' && selectedImg === image.url ? styles.active : '',
            selectedImg !== '' && selectedImg !== image.url ? styles.inactive : '',
          )}
          key={`image_${image.id}`}
        >
          <ImgWithLoader onClick={handleClickItem(image.url)} src={image.url} alt="Фото" />
        </li>
      ))}
    </ul>
  );
};
