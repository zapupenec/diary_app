import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type TPageName = 'note-list' | 'add-note';

interface IInitialState {
  currentPage: TPageName,
  setCurrentPage: Dispatch<SetStateAction<TPageName>>,
}

const RouterContext = createContext<IInitialState>({
  currentPage: 'note-list',
  setCurrentPage: () => {},
});

export const RouterProvider = ({ children }: { children: ReactNode}) => {
  const [currentPage, setCurrentPage] = useState<TPageName>('note-list');

  return (
    <RouterContext.Provider value={{
      currentPage,
      setCurrentPage,
    }}>
      {children}
    </RouterContext.Provider>
  )
}

export const useRouter = () => useContext(RouterContext);
