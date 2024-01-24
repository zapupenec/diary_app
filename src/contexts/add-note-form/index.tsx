import { ReactNode, createContext, useContext, useState } from 'react';

import { TNoteData } from 'types';

interface IAddNoteFormContext {
  formData: TNoteData;
  isValid: {
    title: boolean;
    emoji: boolean;
    date: boolean;
    description: boolean;
    imageUrl: boolean;
  };
  updateFormData: (data: {
    title?: string;
    emoji?: string;
    date?: string;
    description?: string;
    imageUrl?: string;
  }) => void;
  resetFormData: () => void;
  isValidFormData: () => boolean;
}

const initialContext: IAddNoteFormContext = {
  formData: {
    title: '',
    emoji: '',
    date: '',
    description: '',
    imageUrl: '',
  },
  isValid: {
    title: true,
    emoji: true,
    date: true,
    description: true,
    imageUrl: true,
  },
  updateFormData: () => {},
  resetFormData: () => {},
  isValidFormData: () => true,
};

const AddNoteFormContext = createContext<IAddNoteFormContext>(initialContext);

export const AddNoteFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<IAddNoteFormContext['formData']>(
    initialContext.formData,
  );
  const [isValid, setIsValid] = useState<IAddNoteFormContext['isValid']>(initialContext.isValid);

  const validateFields = (data: {
    title?: string;
    emoji?: string;
    date?: string;
    description?: string;
    imageUrl?: string;
  }) => {
    const fields = Object.entries(data);
    const newIsValid = fields.reduce((acc, [fieldName, value]) => {
      return {
        ...acc,
        [fieldName]: value !== '',
      };
    }, isValid);
    setIsValid(newIsValid);
    return newIsValid;
  };

  const updateFormData: IAddNoteFormContext['updateFormData'] = (data) => {
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

  const resetFormData: IAddNoteFormContext['resetFormData'] = () => {
    setFormData(initialContext.formData);
    setIsValid(initialContext.isValid);
  };

  const isValidFormData: IAddNoteFormContext['isValidFormData'] = () => {
    return !Object.values(validateFields(formData)).includes(false);
  };

  return (
    <AddNoteFormContext.Provider
      value={{
        formData,
        isValid,
        updateFormData,
        resetFormData,
        isValidFormData,
      }}
    >
      {children}
    </AddNoteFormContext.Provider>
  );
};

export const useAddNoteForm = () => useContext(AddNoteFormContext);
