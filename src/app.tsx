import { FC } from 'react';

import { Modal } from './components';
import { AddNotePage, MainPage } from './pages';
import { useRouter } from 'contexts/router';

export const App: FC = () => {
  const { currentPage } = useRouter();

  const CurrentPageComponent = {
    'note-list': () => <MainPage />,
    'add-note': () => <AddNotePage />,
  };

  return (
    <>
      {CurrentPageComponent[currentPage]()}
      <Modal />
    </>
  );
};
