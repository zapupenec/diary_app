import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface IModalContext {
  isMounted: boolean;
  isShowModal: boolean;
  type: 'note' | null;
  extra: any | null;
  showModal: (type: IModalContext['type'], data: IModalContext['extra']) => void;
  hideModal: () => void;
}

const initialContext: IModalContext = {
  isMounted: false,
  isShowModal: false,
  type: null,
  extra: null,
  showModal: (type: IModalContext['type'], data: IModalContext['extra']) => {},
  hideModal: () => {},
};

const ModalContext = createContext<IModalContext>(initialContext);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState<IModalContext['isMounted']>(false);
  const [isShowModal, setIsShowModal] = useState<IModalContext['isShowModal']>(false);
  const [type, setType] = useState<IModalContext['type']>(null);
  const [extra, setExtra] = useState<IModalContext['extra']>(null);

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
