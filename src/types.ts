export type DTOImage = {
  id: string;
  alt_description: string;
  urls: {
    regular: string;
  };
}[];

export type TImage = {
  id: string;
  description: string;
  url: string;
};

export type TNoteData = {
  title: string;
  description: string;
  date: string;
  image: TImage | null;
  emoji: string;
};

export type TNote = TNoteData & {
  id: number;
};
