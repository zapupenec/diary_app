export type TNoteData = {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  emoji: string;
};

export type TNote = TNoteData & {
  id: number;
};
