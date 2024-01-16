import { FC } from 'react';

import styles from './styles.module.css';
import { Container, NotesList } from 'components';

export const Main: FC = () => {
  return (
    <Container>
      <section className={styles.main}>
        <NotesList />
      </section>
    </Container>
  );
};
