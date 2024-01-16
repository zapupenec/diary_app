import { FC, HTMLAttributes } from 'react';

import styles from './styles.module.css';
import { getDisplayDate } from 'lib';
import { TNote } from 'types';

interface INotesItemProps extends HTMLAttributes<HTMLElement> {
  note: TNote;
}

export const NotesItem: FC<INotesItemProps> = ({ note }) => {
  const { emoji, foto, title, date, note: description } = note;
  const { dateTime, dateDisplay } = getDisplayDate(date);

  return (
    <article className={styles.container} tabIndex={0} aria-label="читать заметку полностью">
      <div className={styles.boxContent}>
        <span className={styles.moodStatus}>{emoji}</span>
        <div className={styles.content}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{title}</h3>
            <time dateTime={dateTime} className={styles.date}>
              {dateDisplay}
            </time>
          </div>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <img className={styles.image} src={foto} alt={title} />
    </article>
  );
};
