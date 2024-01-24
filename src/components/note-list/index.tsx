import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './note-list.module.css';
import { NotesItem } from './note-item';
import { TNote } from 'types';

interface INotesItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  notes: TNote[];
}

export const NotesList: FC<INotesItemProps> = ({ notes }) => {
  return (
    <ul className={styles.container}>
      {notes.map((note) => (
        <li key={note.id}>
          <NotesItem note={note} />
        </li>
      ))}
    </ul>
  );
};
