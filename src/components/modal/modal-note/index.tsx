import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './modal-note.module.css';
import { Emoji, Icon, ImgWithLoader } from 'components';
import { useModal } from 'contexts/modal';
import { getDisplayDate } from 'lib';

interface IModalNoteProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ModalNote: FC<IModalNoteProps> = () => {
  const { extra, hideModal } = useModal();
  const { title, note: description, date, foto, emoji } = extra.note;
  const { dateTime, dateDisplay } = getDisplayDate(date, 'long');

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.content}>
        <button className={styles.btnClose} onClick={hideModal} aria-label="Закрыть">
          <Icon name="cross" />
        </button>
        <div className={styles.header}>
          <h2 className={styles.title} id="modal-header">
            {title}
          </h2>
        </div>
        <div className={styles.body} id="modal-content">
          <div className={styles.description}>
            <time dateTime={dateTime} className={styles.date}>
              {dateDisplay}
            </time>
            <div className={styles.descriptionText}>{description}</div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.moodStatus}>
              <Emoji emoji={emoji} size="big" />
            </div>
            <ImgWithLoader className={styles.image} src={foto} alt={title} />
          </div>
        </div>
      </div>
    </div>
  );
};
