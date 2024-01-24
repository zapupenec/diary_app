import { FC, FormEvent } from 'react';

import styles from './search-image.module.css';
import notes from 'mock/notes.json';
import { Button, Icon, ImagesList, Input } from 'components';

interface ISearchImageProps {
  selectedImg: string;
  onChangeImage: (value: string) => void;
}

const images = notes.map((item) => ({
  url: item.imageUrl,
  id: item.id,
}));

export const SearchImage: FC<ISearchImageProps> = ({
  onChangeImage = () => {},
  selectedImg = '',
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} id="search-image-form" onSubmit={handleSubmit}>
        <Input placeholder="Поиск" type="search" id="search" />
        <Button className={styles['submit-btn']} type="submit" aria-label="Поиск фото">
          <Icon name="search" />
        </Button>
      </form>
      <ImagesList images={images} onClickItem={onChangeImage} selectedImg={selectedImg} />
    </div>
  );
};
