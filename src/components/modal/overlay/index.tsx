import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import { useModal } from 'contexts/modal';
import styles from './overlay.module.css';

interface IOverlayProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Overlay: FC<IOverlayProps> = () => {
  const { isShowModal, hideModal } = useModal();

  return (
    <div
      role="button"
      className={`${styles.background} ${isShowModal && styles.shown}`}
      onClick={hideModal}
    />
  );
};
