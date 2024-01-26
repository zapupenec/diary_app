import { DTOImage, TImage } from 'types';

export const parseDataImages = (data: DTOImage) => {
  const initial: TImage[] = [];
  const images = data.reduce((acc, image) => {
    return [...acc, { id: image.id, description: image.alt_description, url: image.urls.regular }];
  }, initial);

  return images;
};
