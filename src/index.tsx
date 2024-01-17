import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app';
import { ModalProvider } from 'contexts/modal';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
);
