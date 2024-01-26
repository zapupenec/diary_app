import { FC, memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';
import { useModal } from 'contexts/modal';
import { Overlay } from './overlay';
import { ModalNote } from './modal-note';
import { ModalSearchImage } from './modal-search-image';
import { AnimationForContent } from './animation-for-content';

// модалки с контентом, которые помещаем в Modal
const modals = {
  note: ModalNote,
  'search-image': ModalSearchImage,
};

export const Modal: FC = memo(() => {
  const { isMounted, hideModal, type } = useModal();

  // создаем root-modal для портала
  const [container] = useState(() => {
    const rootModalEl = document.createElement('div');
    rootModalEl.id = 'root-modal';
    return rootModalEl;
  });

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  // отключаем доступ к #root, запоминаем его окна, компенсируем размеры без скроллов
  const scrollPositionY = useRef(0);
  const scrollPositionX = useRef(0);

  useEffect(() => {
    const rootEl = document.getElementById('root');
    if (rootEl) {
      if (isMounted) {
        const paddingRight = window.innerWidth - document.documentElement.clientWidth;
        const paddingBottom = window.innerHeight - document.documentElement.clientHeight;
        scrollPositionY.current = window.scrollY;
        scrollPositionX.current = window.scrollX;

        rootEl.setAttribute('aria-hidden', 'true');
        rootEl.setAttribute('inert', '');
        rootEl.style.cssText = `
          overflow: hidden;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          padding-right: ${paddingRight}px;
          padding-bottom: ${paddingBottom}px;
        `;

        rootEl.scroll({
          top: scrollPositionY.current,
          left: scrollPositionX.current,
          behavior: 'auto',
        });
      } else {
        rootEl.removeAttribute('aria-hidden');
        rootEl.removeAttribute('inert');
        rootEl.style.cssText = '';
        window.scroll({
          top: scrollPositionY.current,
          left: scrollPositionX.current,
          behavior: 'auto',
        });
      }
    }
  }, [isMounted]);

  // закрытие на Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // достаем необходимую модалку
  const CurrentModal = type ? modals[type] : () => <></>;

  return createPortal(
    isMounted && (
      <div
        id="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-header"
        aria-describedby="modal-content"
        className={styles.window}
        onClick={hideModal}
      >
        {/* стили анимации Overlay внутри самого компонента */}
        <Overlay />
        <AnimationForContent>
          <CurrentModal />
        </AnimationForContent>
      </div>
    ),
    container,
  );
});
