import { FC, HTMLAttributes } from 'react';

import styles from './styles.module.css';
import { NotesItem } from './note-item';
import notes from '../../mock/notes.json';

interface INotesItemProps extends HTMLAttributes<HTMLUListElement> {}

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
