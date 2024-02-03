import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

import { TNote, TNoteData } from 'types';
import { genNoteId } from 'lib';

interface IFilterValues {
  title: string;
  emoji: string;
}

const initialFilterValues: IFilterValues = { title: '', emoji: '' };

interface IDiaryContext {
  notes: TNote[];
  addNote: (noteData: TNoteData) => void;
  editNote: (id: TNote['id'], noteData: TNoteData) => void;
  removeNote: (id: TNote['id']) => void;
  getNoteById: (id: TNote['id']) => TNote | null;
  filterValues: IFilterValues;
  updateFilterValues: (data: { title?: string; emoji?: string }) => void;
  resetFilterValues: () => void;
}

const initialContext: IDiaryContext = {
  notes: [],
  addNote: () => {},
  editNote: () => {},
  removeNote: () => {},
  getNoteById: () => null,
  filterValues: { title: '', emoji: '' },
  updateFilterValues: () => {},
  resetFilterValues: () => {},
};

const DiaryContext = createContext<IDiaryContext>(initialContext);

export const DiaryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState(initialContext.notes);
  const [filterValues, setFilterValues] = useState(initialContext.filterValues);

  useEffect(() => {
    const localData = window.localStorage.getItem('notes');
    if (localData) {
      const localNotes = JSON.parse(localData);
      setNotes(localNotes as TNote[]);
    }
  }, []);

  const trimNoteData = (note: TNoteData) =>
    Object.fromEntries(
      Object.entries(note).map(([name, value]) => {
        if (typeof value === 'string') {
          return [name, value.trim()];
        }
        return [name, value];
      }),
    );

  const sortByDateInReverseOrder = (notes: TNote[]) =>
    [...notes].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  const addNote: IDiaryContext['addNote'] = (noteData) => {
    const trimmedNoteData = trimNoteData(noteData);

    const newNote = { id: genNoteId(notes), ...trimmedNoteData };
    const newNotes = sortByDateInReverseOrder([...notes, newNote as TNote]);

    setNotes(newNotes);
    window.localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const editNote: IDiaryContext['editNote'] = (id, note) => {
    const currNote = notes.find((note) => note.id === id);
    if (!currNote) {
      throw new Error(`Unknown note id: ${id}`);
    }

    const trimmedNoteData = trimNoteData(note);
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...currNote, ...trimmedNoteData } : note,
    );
    const sortedNotes = sortByDateInReverseOrder(updatedNotes);

    setNotes(sortedNotes);
    window.localStorage.setItem('notes', JSON.stringify(sortedNotes));
  };

  const removeNote: IDiaryContext['removeNote'] = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    window.localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const getNoteById = useCallback<IDiaryContext['getNoteById']>(
    (id) => notes.find((note) => note.id === id) ?? null,
    [notes],
  );

  const updateFilterValues: IDiaryContext['updateFilterValues'] = (data) => {
    const fields = Object.entries(data);
    setFilterValues((prev) =>
      fields.reduce((acc, [fieldName, value]) => {
        return {
          ...acc,
          [fieldName]: value,
        };
      }, prev),
    );
  };

  const resetFilterValues: IDiaryContext['resetFilterValues'] = () => {
    setFilterValues(initialFilterValues);
  };

  const filter = (notes: IDiaryContext['notes']) => {
    let result = [...notes];
    for (const prop in filterValues) {
      const key = prop as keyof IFilterValues;
      result = result.filter(
        (note) => filterValues[key] === '' || note[key].includes(filterValues[key]),
      );
    }
    return result;
  };

  return (
    <DiaryContext.Provider
      value={{
        notes: filter(notes),
        addNote,
        editNote,
        removeNote,
        getNoteById,
        filterValues,
        updateFilterValues,
        resetFilterValues,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => useContext(DiaryContext);
