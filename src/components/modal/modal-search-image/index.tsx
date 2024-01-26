import { DetailedHTMLProps, FC, HTMLAttributes, useEffect } from 'react';

import styles from './modal-search-image.module.css';
import { SearchImage } from 'components';
import { useModal } from 'contexts/modal';
import { useResize } from 'hooks';

interface IModalSearchImageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ModalSearchImage: FC<IModalSearchImageProps> = () => {
  const { extra, hideModal } = useModal();
  const { handleClickImage } = extra;
  const { width } = useResize();

  const handleClick = (value: string) => {
    handleClickImage(value);
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
        <SearchImage onClickImage={handleClick} />
      </div>
    </div>
  );
};
