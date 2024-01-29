import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './modal-note.module.css';
import { Emoji, Icon, ImgWithLoader } from 'components';
import { useModal } from 'contexts/modal';
import { getDisplayDate } from 'lib';
import { useResize } from 'hooks';

interface IModalNoteProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ModalNote: FC<IModalNoteProps> = () => {
  const { extra, hideModal } = useModal();
  const { title, description, date, image, emoji } = extra.note;
  const { dateTime, dateDisplay } = getDisplayDate(date, 'long');
  const { width } = useResize();

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.content}>
        <button className={styles['btn-close']} onClick={hideModal} aria-label="Закрыть">
          <Icon name="cross" />
        </button>
        <h2 className={styles.title} id="modal-header">
          {title}
        </h2>
        <time dateTime={dateTime} className={styles.date}>
          {dateDisplay}
        </time>
        <div className={styles.description}>{description}</div>
        <div className={styles['image-container']}>
          <div className={styles['mood-status']}>
            <Emoji emoji={emoji} size={width <= 1023 ? 'small' : 'big'} />
          </div>
          <ImgWithLoader className={styles.image} src={image.url} alt={image.description} />
        </div>
      </div>
    </div>
  );
};
