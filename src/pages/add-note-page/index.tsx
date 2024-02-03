import { FC } from 'react';

import { NoteForm, Layout } from 'components';

export const AddNotePage: FC = () => (
  <Layout>
    <NoteForm type='add'/>
  </Layout>
);
