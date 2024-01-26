import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './image-list.module.css';
import { ImageItem } from './image-item';
import { TImage } from 'types';

interface IImageListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  images: TImage[];
  onClickItem: (image: TImage | null) => void;
  selectedImg: string;
}

export const ImageList: FC<IImageListProps> = ({ images, onClickItem = () => {}, selectedImg }) => {
  const handleClickItem = (image: TImage) => () => {
    if (selectedImg === image.url) {
      onClickItem(null);
      return;
    }

    onClickItem(image);
  };

  return (
    <ul className={styles.list}>
      {images?.map((image) => (
        <ImageItem
          tabIndex={0}
          role="button"
          aria-label="Выбрать эту фотографию"
          key={image.id}
          image={image}
          onClick={handleClickItem(image)}
          status={
            selectedImg === '' ? 'regular' : selectedImg === image.url ? 'active' : 'inactive'
          }
        />
      ))}
    </ul>
  );
};
