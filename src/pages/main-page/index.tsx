import { FC } from 'react';

import { Layout, NotesList } from 'components';
import { useDiary } from 'contexts/diary';

export const MainPage: FC = () => {
  const { notes } = useDiary();

  return (
    <Layout>
      <NotesList notes={notes} />
    </Layout>
  );
};
