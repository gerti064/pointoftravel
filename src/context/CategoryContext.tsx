import React, { createContext, useContext, useState } from 'react';

// shape of one featured item
export interface Category {
  id: number;
  title: string;
  text: string;
  image: string;
}

// your three defaults
const initialItems: Category[] = [
  { id: 1, title: 'Beach Escapes',       text: 'Relax on sun-soaked beaches and crystal-clear waters.', image: '/assets/p1.jpeg' },
  { id: 2, title: 'Mountain Adventures', text: 'Find thrills in the highlands.',                   image: '/assets/p2.jpg' },
  { id: 3, title: 'City Tours',          text: 'Immerse yourself in vibrant cultures.',            image: '/assets/p3.jpg' },
];

type CategoryCtx = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const CategoryContext = createContext<CategoryCtx | undefined>(undefined);

export const CategoryProvider: React.FC = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(initialItems);
  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategories() {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error('useCategories must be inside CategoryProvider');
  return ctx;
}
