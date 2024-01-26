import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

type TModalName = 'note' | 'search-image';

interface IModalContext {
  isMounted: boolean;
  isShowModal: boolean;
  type: TModalName | null;
  extra: any | null;
  showModal: (type: IModalContext['type'], extra: IModalContext['extra']) => void;
  hideModal: () => void;
}

const initialContext: IModalContext = {
  isMounted: false,
  isShowModal: false,
  type: null,
  extra: null,
  showModal: () => {},
  hideModal: () => {},
};

const ModalContext = createContext<IModalContext>(initialContext);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(initialContext.isMounted);
  const [isShowModal, setIsShowModal] = useState(initialContext.isShowModal);
  const [type, setType] = useState(initialContext.type);
  const [extra, setExtra] = useState(initialContext.extra);

  const showModal: IModalContext['showModal'] = (type, extra) => {
    setIsMounted(true);
    setIsClosing(false);
    setType(type);
    setExtra(extra);
  };

  const hideModal: IModalContext['hideModal'] = () => {
    setIsShowModal(false);
    setIsClosing(true);
  };

  useEffect(() => {
    if (isMounted && !isClosing) {
      setIsShowModal(true);
    } else if (isMounted) {
      setTimeout(() => {
        setIsMounted(false);
      }, 500);
    }
  }, [isClosing, isMounted, isShowModal]);

  const providedData: IModalContext = {
    isMounted,
    isShowModal,
    type,
    extra,
    showModal,
    hideModal,
  };

  return <ModalContext.Provider value={providedData}>{children}</ModalContext.Provider>;
};

export const useModal = () => useContext(ModalContext);
