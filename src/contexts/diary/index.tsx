import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { TNote, TNoteData } from 'types';
import { genNoteId } from 'lib';

interface IDiaryContext {
  notes: TNote[];
  addNote: (noteData: TNoteData) => void;
}

const sortByDateInReverseOrder = (notes: TNote[]) =>
  [...notes].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const initialContext: IDiaryContext = {
  notes: [],
  addNote: () => {},
};

const DiaryContext = createContext<IDiaryContext>(initialContext);

export const DiaryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState(initialContext.notes);

  useEffect(() => {
    const localData = window.localStorage.getItem('notes');
    if (localData) {
      const localNotes = JSON.parse(localData);
      setNotes(localNotes as TNote[]);
    }
  }, []);

  const addNote: IDiaryContext['addNote'] = (noteData) => {
    const trimmedNoteData = Object.fromEntries(
      Object.entries(noteData).map(([name, value]) => {
        if (typeof value === 'string') {
          return [name, value.trim()];
        }
        return [name, value];
      }),
    );

    const newNote = { id: genNoteId(notes), ...trimmedNoteData };
    const newNotes = sortByDateInReverseOrder([...notes, newNote as TNote]);

    setNotes(newNotes);
    window.localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  return (
    <DiaryContext.Provider
      value={{
        notes,
        addNote,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => useContext(DiaryContext);
