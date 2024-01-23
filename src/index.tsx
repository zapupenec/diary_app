import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app';
import { ModalProvider } from 'contexts/modal';
import { RouterProvider } from 'contexts/router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </ModalProvider>
  </React.StrictMode>,
);
