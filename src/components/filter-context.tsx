// FilterContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { BillType, Congress } from '@/components/type';

interface FilterContextType {
  selectedTypes: BillType[];
  selectedCongress: Congress[];
  selectedCategories: string[];
  toggleTypeSelection: (type: BillType) => void;
  toggleCongressSelection: (congress: Congress) => void;
  toggleCategorySelection: (value: string) => void;
}

// Create context with initial default value
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Props type for Provider
interface FilterProviderProps {
  children: ReactNode;
}

// Create provider component
export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [selectedTypes, setSelectedTypes] = useState<BillType[]>([]);
  const [selectedCongress, setSelectedCongress] = useState<Congress[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Toggle functions
  const toggleTypeSelection = (type: BillType) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(item => item !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const toggleCongressSelection = (congress: Congress) => {
    setSelectedCongress(prev => {
      if (prev.includes(congress)) {
        return prev.filter(item => item !== congress);
      } else {
        return [...prev, congress];
      }
    });
  };

  const toggleCategorySelection = (value: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Value to be provided
  const value: FilterContextType = {
    selectedTypes,
    selectedCongress,
    selectedCategories,
    toggleTypeSelection,
    toggleCongressSelection,
    toggleCategorySelection,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook for using the context
export const useFilters = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
