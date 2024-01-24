import { TNote } from 'types';

export const genNoteId = (col: TNote[]) => {
  const ids = col.map(({ id }) => id);
  return Math.max(...ids) + 1;
};
