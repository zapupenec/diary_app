import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './note-list.module.css';
import { NotesItem } from './note-item';
import notes from '../../mock/notes.json';

interface INotesItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {}

export const NotesList: FC<INotesItemProps> = () => {
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
