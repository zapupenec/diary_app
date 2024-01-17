import { FC } from 'react';

import styles from './main.module.css';
import { NotesList } from 'components';

export const Main: FC = () => {
  return (
    <section className={styles.container}>
      <NotesList />
    </section>
  );
};
