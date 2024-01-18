import { DetailedHTMLProps, FC, HTMLAttributes, KeyboardEventHandler } from 'react';

import styles from './note-item.module.css';
import { getDisplayDate } from 'lib';
import { TNote } from 'types';
import { useModal } from 'contexts/modal';
import { Emoji } from 'components';

interface INotesItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  note: TNote;
}

export const NotesItem: FC<INotesItemProps> = ({ note }) => {
  const { emoji, foto, title, date, note: description } = note;
  const { dateTime, dateDisplay } = getDisplayDate(date);

  const { showModal } = useModal();

  const showModalNote = () => {
    showModal('note', { note });
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      showModalNote();
    }
  };

  return (
    <article
      className={styles.container}
      tabIndex={0}
      onClick={showModalNote}
      onKeyDown={handleKeyDown}
      aria-label="открыть заметку"
    >
      <div className={styles['background-image']} style={{ backgroundImage: `url(${foto})` }} />
      <div className={styles.moodStatus}>
        <Emoji emoji={emoji} size="small" />
      </div>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>
          <time dateTime={dateTime} className={styles.date}>
            {dateDisplay}
          </time>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
};
