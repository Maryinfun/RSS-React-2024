import React, { createContext, useContext, useState, ReactNode } from 'react';


interface FormValues {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    terms: boolean;
  }
  
  interface FormContextType {
    formDataList: FormValues[];
    addFormData: (data: FormValues) => void;
  }
  
  const FormContext = createContext<FormContextType | undefined>(undefined);
  
  export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [formDataList, setFormDataList] = useState<FormValues[]>([]);
  
    const addFormData = (data: FormValues) => {
      setFormDataList(prevData => [...prevData, data]);
    };
  
    return (
      <FormContext.Provider value={{ formDataList, addFormData }}>
        {children}
      </FormContext.Provider>
    );
  };
  
  export const useFormContext = (): FormContextType => {
    const context = useContext(FormContext);
    if (!context) {
      throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
  };