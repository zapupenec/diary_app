import { DTOImage } from 'types';

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = new URL('https://api.unsplash.com');

const genURI = (query?: string) => {
  baseUrl.pathname = `/photos/random`;
  baseUrl.searchParams.set('client_id', apiKey ?? '');
  baseUrl.searchParams.set('count', '10');
  if (query) {
    baseUrl.searchParams.set('query', query);
  }
  return baseUrl;
};

const requestSearchImages = async (query?: string) => {
  const response = await fetch(genURI(query));
  if (!response.ok) {
    const { status } = response;
    switch (status) {
      case 403:
        throw Error('Превышен лимит запросов. Попробуйте позже.');
      case 404:
        throw Error('Ничего не найдено по данному запросу.');
      default:
        throw Error('Что-то пошло не так.');
    }
  }
  return (await response.json()) as DTOImage;
};

export const images = {
  requestSearchImages,
};
