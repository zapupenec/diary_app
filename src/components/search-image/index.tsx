import styles from './search-image.module.css';

import notes from '../../mock/notes.json';
import { Button, Icon, ImagesList, Input } from 'components';
import { FormEvent } from 'react';

const images = notes.map((item) => ({
  img: item.foto,
  id: item.id,
}));

export const SearchImage = () => {
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
      <ImagesList images={images} />
    </div>
  );
};
