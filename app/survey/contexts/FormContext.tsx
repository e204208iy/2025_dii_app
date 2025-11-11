// contexts/FormContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SurveyFormData, AllFoodsData } from '../types';

interface FormContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  foodsData: AllFoodsData | null;
  setFoodsData: (data: AllFoodsData) => void;
  results: Record<string, number>;
  setResult: (foodName: string, value: number) => void;
  form: UseFormReturn<SurveyFormData> | null;
  setForm: (form: UseFormReturn<SurveyFormData>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [foodsData, setFoodsData] = useState<AllFoodsData | null>(null);
  const [results, setResults] = useState<Record<string, number>>({});
  const [form, setForm] = useState<UseFormReturn<SurveyFormData> | null>(null);

  const setResult = (foodName: string, value: number) => {
    setResults(prev => {
      if (value === 0) {
        const newResults = { ...prev };
        delete newResults[foodName];
        return newResults;
      }
      return { ...prev, [foodName]: value };
    });
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        foodsData,
        setFoodsData,
        results,
        setResult,
        form,
        setForm
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
}