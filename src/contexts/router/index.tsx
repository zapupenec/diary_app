import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type TPageName = 'note-list' | 'add-note';

interface IRouterContext {
  currentPage: TPageName;
  setCurrentPage: Dispatch<SetStateAction<TPageName>>;
}

const initialContext: IRouterContext = {
  currentPage: 'note-list',
  setCurrentPage: () => {},
};

const RouterContext = createContext<IRouterContext>(initialContext);

export const RouterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<IRouterContext['currentPage']>(
    initialContext.currentPage,
  );

  return (
    <RouterContext.Provider
      value={{
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
