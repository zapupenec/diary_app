import { ReactNode, createContext, useContext, useState } from 'react';

import { TImage, TNoteData } from 'types';

interface INoteFormContext {
  formData: TNoteData;
  isValid: {
    title: boolean;
    emoji: boolean;
    date: boolean;
    description: boolean;
    image: boolean;
  };
  updateFormData: (data: {
    title?: string;
    emoji?: string;
    date?: string;
    description?: string;
    image?: TImage | null;
  }) => void;
  resetFormData: () => void;
  isValidFormData: () => boolean;
}

const initialContext: INoteFormContext = {
  formData: {
    title: '',
    emoji: '',
    date: '',
    description: '',
    image: null,
  },
  isValid: {
    title: true,
    emoji: true,
    date: true,
    description: true,
    image: true,
  },
  updateFormData: () => {},
  resetFormData: () => {},
  isValidFormData: () => true,
};

const NoteFormContext = createContext<INoteFormContext>(initialContext);

export const NoteFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState(initialContext.formData);
  const [isValid, setIsValid] = useState(initialContext.isValid);

  const validateFields = (data: {
    title?: string;
    emoji?: string;
    date?: string;
    description?: string;
    image?: TImage | null;
  }) => {
    const fields = Object.entries(data);
    const newIsValid = fields.reduce((acc, [fieldName, value]) => {
      return {
        ...acc,
        [fieldName]: typeof value === 'string' ? value !== '' : value !== null,
      };
    }, isValid);
    setIsValid(newIsValid);
    return newIsValid;
  };

  const updateFormData: INoteFormContext['updateFormData'] = (data) => {
    const fields = Object.entries(data);
    setFormData((prev) =>
      fields.reduce((acc, [fieldName, value]) => {
        return {
          ...acc,
          [fieldName]: value,
        };
      }, prev),
    );
    validateFields(data);
  };

  const resetFormData: INoteFormContext['resetFormData'] = () => {
    setFormData(initialContext.formData);
    setIsValid(initialContext.isValid);
  };

  const isValidFormData: INoteFormContext['isValidFormData'] = () => {
    return !Object.values(validateFields(formData)).includes(false);
  };

  return (
    <NoteFormContext.Provider
      value={{
        formData,
        isValid,
        updateFormData,
        resetFormData,
        isValidFormData,
      }}
    >
      {children}
    </NoteFormContext.Provider>
  );
};

export const useNoteForm = () => useContext(NoteFormContext);
