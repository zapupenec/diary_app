import { FC, ReactNode, createContext, useContext, useState } from 'react';

type TPageName = 'note-list' | 'add-note' | 'edit-note';

interface IRouterContext {
  currentPage: TPageName;
  extra: {
    noteId: number;
  } | null;
  navigateTo: (pageName: TPageName, extra?: IRouterContext['extra']) => void;
}

const initialContext: IRouterContext = {
  currentPage: 'note-list',
  extra: null,
  navigateTo: () => {},
};

const RouterContext = createContext<IRouterContext>(initialContext);

export const RouterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(initialContext.currentPage);
  const [extra, setExtra] = useState(initialContext.extra);

  const navigateTo: IRouterContext['navigateTo'] = (pageName, extra = null) => {
    setCurrentPage(pageName);
    setExtra(extra);
  };

  return (
    <RouterContext.Provider
      value={{
        currentPage,
        extra,
        navigateTo,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
