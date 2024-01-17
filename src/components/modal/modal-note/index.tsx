import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './modal-note.module.css';
import { Icon } from 'components/icon';
import { useModal } from 'contexts/modal';
import { getDisplayDate } from 'lib';

interface IModalNoteProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ModalNote: FC<IModalNoteProps> = () => {
  const { extra, hideModal } = useModal();
  const { title, note: description, date, foto, emoji } = extra.note;
  const { dateTime, dateDisplay } = getDisplayDate(date);

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.content}>
        <button className={styles.btnClose} onClick={hideModal} aria-label="Закрыть">
          <Icon name="cross" />
        </button>
        <div className={styles.header}>
          <h2 className={styles.title} id="modal-header">
            {title}
            <span className={styles.emoji}>{emoji}</span>
          </h2>
        </div>
        <div className={styles.body}>
          <div className={styles.description} id="modal-content">
            <time dateTime={dateTime} className={styles.date}>
              {dateDisplay}
            </time>
            <div className={styles.descriptionText}>{description}</div>
          </div>
          <div className={styles.imageContainer}>
            <img src={foto} className={styles.image} alt={title} />
          </div>
        </div>
      </div>
    </div>
  );
};
