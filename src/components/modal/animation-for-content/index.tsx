import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import { useModal } from 'contexts/modal';
import styles from './animation-for-content.module.css';

interface IAnimationForContentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const AnimationForContent: FC<IAnimationForContentProps> = ({ children }) => {
  const { isShowModal } = useModal();

  return (
    <div
      className={`${styles.container} ${isShowModal && styles.animate}`}
      // onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};
