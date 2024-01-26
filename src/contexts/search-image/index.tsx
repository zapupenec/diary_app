import { ReactNode, createContext, useCallback, useContext, useState } from 'react';

import { TImage } from 'types';
import { api } from 'api';
import { parseDataImages } from 'lib';

interface ISearchImageContext {
  images: TImage[];
  fetchImages: (querry?: string) => Promise<void>;
  isLoading: boolean;
  feedback: string;
}

const initialContext: ISearchImageContext = {
  images: [],
  fetchImages: () => Promise.resolve(),
  isLoading: false,
  feedback: '',
};

const SearchImageContext = createContext<ISearchImageContext>(initialContext);

export const SearchImageProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState(initialContext.images);
  const [feedback, setFeedback] = useState(initialContext.feedback);
  const [isLoading, setIsLoading] = useState(initialContext.isLoading);

  const fetchImages: ISearchImageContext['fetchImages'] = useCallback(async (querry) => {
    try {
      if (querry === '') {
        setFeedback('Введите запрос для поиска');
      }

      setImages([]);
      setIsLoading(true);
      setFeedback('Загрузка...');

      const data = await api.images.requestSearchImages(querry);
      const newImages = parseDataImages(data);

      setImages(newImages);
      setFeedback('');
    } catch (error) {
      if (error instanceof Error) {
        setFeedback(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <SearchImageContext.Provider
      value={{
        images,
        fetchImages,
        isLoading,
        feedback,
      }}
    >
      {children}
    </SearchImageContext.Provider>
  );
};

export const useSearchImage = () => useContext(SearchImageContext);
