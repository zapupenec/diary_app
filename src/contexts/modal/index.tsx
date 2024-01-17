import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface IModalContext {
  isMounted: boolean;
  isShowModal: boolean;
  type: 'note' | null;
  extra: any | null;
  showModal: (type: IModalContext['type'], data: IModalContext['extra']) => void;
  hideModal: () => void;
}

const defaultState = {
  isMounted: false,
  isShowModal: false,
  type: null,
  extra: null,
  showModal: (type: IModalContext['type'], data: IModalContext['extra']) => {},
  hideModal: () => {},
};

const ModalContext = createContext<IModalContext>(defaultState);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState<IModalContext['isMounted']>(false);
  const [isShowModal, setIsShowModal] = useState<IModalContext['isShowModal']>(false);
  const [type, setType] = useState<IModalContext['type']>(null);
  const [extra, setExtra] = useState<IModalContext['extra']>(null);

  const showModal = (type: IModalContext['type'], extra: IModalContext['extra']) => {
    setIsMounted(true);
    setIsClosing(false);
    setType(type);
    setExtra(extra);
  };

  const hideModal = () => {
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
