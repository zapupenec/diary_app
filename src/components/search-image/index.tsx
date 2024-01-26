import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';

import styles from './search-image.module.css';
import { Button, Icon, ImageList, Input } from 'components';
import { useSearchImage } from 'contexts/search-image';
import { useDebounce } from 'hooks';
import { TImage } from 'types';

interface ISearchImageProps {
  autoFocus?: boolean;
  selectedImg?: string;
  onClickImage: (image: TImage | null) => void;
}

export const SearchImage: FC<ISearchImageProps> = ({
  autoFocus = false,
  onClickImage = () => {},
  selectedImg = '',
}) => {
  const [query, setQuery] = useState('');
  const [isValid, setIsValid] = useState(true);
  const { images, fetchImages, isLoading, feedback } = useSearchImage();

  const fetch = useDebounce(async (currQuerry?: string) => {
    if (currQuerry === '') {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    await fetchImages(currQuerry);
  }, 1000);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    fetch(query);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
    fetch(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} id="search-image-form" onSubmit={handleSubmit}>
        <Input
          placeholder="Поиск"
          type="search"
          id="search"
          onChange={handleChange}
          isValid={isValid}
          autoFocus={autoFocus}
          disabled={isLoading}
        />
        <Button
          className={styles['submit-btn']}
          type="submit"
          aria-label="Поиск фото"
          disabled={isLoading}
        >
          <Icon name="search" />
        </Button>
        {feedback !== '' && <span className={styles.feedback}>{feedback}</span>}
      </form>
      <ImageList images={images} onClickItem={onClickImage} selectedImg={selectedImg} />
    </div>
  );
};
