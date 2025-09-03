import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudentType } from '../types/student';

interface StudentContextType {
  studentType: StudentType | null;
  setStudentType: (type: StudentType) => void;
  hasSelectedType: boolean;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
  const [studentType, setStudentTypeState] = useState<StudentType | null>(null);
  const [hasSelectedType, setHasSelectedType] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('studentType') as StudentType | null;
    if (saved && (saved === 'home' || saved === 'international')) {
      setStudentTypeState(saved);
      setHasSelectedType(true);
    }
  }, []);

  const setStudentType = (type: StudentType) => {
    setStudentTypeState(type);
    setHasSelectedType(true);
    localStorage.setItem('studentType', type);
  };

  return (
    <StudentContext.Provider value={{ studentType, setStudentType, hasSelectedType }}>
      {children}
    </StudentContext.Provider>
  );
};