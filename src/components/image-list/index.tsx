import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './image-list.module.css';
import { ImageItem, TImage } from './image-item';

interface IImageListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  images: TImage[];
  onClickItem: (value: string) => void;
  selectedImg: string;
}

export const ImageList: FC<IImageListProps> = ({ images, onClickItem = () => {}, selectedImg }) => {
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
        <ImageItem
          key={image.id}
          image={image}
          onClick={handleClickItem(image.url)}
          status={
            selectedImg === '' ? 'regular' : selectedImg === image.url ? 'active' : 'inactive'
          }
        />
      ))}
    </ul>
  );
};
