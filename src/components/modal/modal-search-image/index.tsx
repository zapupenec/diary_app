import { DetailedHTMLProps, FC, HTMLAttributes, useEffect } from 'react';

import styles from './modal-search-image.module.css';
import { SearchImage } from 'components';
import { useModal } from 'contexts/modal';
import { useResize } from 'hooks';
import { TImage } from 'types';

interface IModalSearchImageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ModalSearchImage: FC<IModalSearchImageProps> = () => {
  const { extra, hideModal } = useModal();
  const { handleClickImage } = extra;
  const { width } = useResize();

  const handleClick = (image: TImage | null) => {
    handleClickImage(image);
    hideModal();
  };

  useEffect(() => {
    if (width > 1439) {
      hideModal();
    }
  }, [hideModal, width]);

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.content}>
        <SearchImage onClickImage={handleClick} autoFocus />
      </div>
    </div>
  );
};
