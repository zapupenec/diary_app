import { FC } from 'react';

import { NoteForm, Layout } from 'components';

export const EditNotePage: FC = () => (
  <Layout>
    <NoteForm type='edit'/>
  </Layout>
);
