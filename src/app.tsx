import { FC } from 'react';

import { Modal } from './components';
import { AddNotePage, EditNotePage, MainPage } from './pages';
import { useRouter } from 'contexts/router';

export const App: FC = () => {
  const { currentPage } = useRouter();

  const CurrentPageComponent = {
    'note-list': () => <MainPage />,
    'add-note': () => <AddNotePage />,
    'edit-note': () => <EditNotePage />,
  };

  return (
    <>
      {CurrentPageComponent[currentPage]()}
      <Modal />
    </>
  );
};
