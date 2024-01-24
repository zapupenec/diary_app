import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

import initialNotes from 'mock/notes.json';
import { TNote, TNoteData } from 'types';
import { genNoteId } from 'lib';

interface IDiaryContext {
  notes: TNote[];
  addNote: (noteData: TNoteData) => void;
}

const initialContext: IDiaryContext = {
  notes: initialNotes,
  addNote: () => {},
};

const DiaryContext = createContext<IDiaryContext>(initialContext);

export const DiaryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<IDiaryContext['notes']>(initialContext.notes);

  useEffect(() => {
    const localData = window.localStorage.getItem('notes');
    if (localData) {
      const localNotes = JSON.parse(localData);
      setNotes(localNotes as TNote[]);
    }
  }, []);

  const addNote: IDiaryContext['addNote'] = (noteData) => {
    console.log(noteData);
    const trimmedNoteData = Object.fromEntries(
      Object.entries(noteData).map(([name, value]) => [name, value.trim()]),
    );
    const newNote = { id: genNoteId(notes), ...trimmedNoteData };
    setNotes((prev) => [...prev, newNote as TNote]);
    window.localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
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
