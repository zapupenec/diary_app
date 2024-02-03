import ReactDOM from 'react-dom/client';

import './index.css';
import { App } from './app';
import { NoteFormProvider } from 'contexts/note-form';
import { DiaryProvider } from 'contexts/diary';
import { ModalProvider } from 'contexts/modal';
import { RouterProvider } from 'contexts/router';
import { SearchImageProvider } from 'contexts/search-image';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <DiaryProvider>
    <SearchImageProvider>
      <NoteFormProvider>
        <ModalProvider>
          <RouterProvider>
            <App />
          </RouterProvider>
        </ModalProvider>
      </NoteFormProvider>
    </SearchImageProvider>
  </DiaryProvider>,
);
