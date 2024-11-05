import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Get stored value and ensure it is parsed correctly as a string
  const storedValue = typeof window !== 'undefined' 
    ? window.localStorage.getItem(key) 
    : null;

  const initial = storedValue ? storedValue.replace(/"/g, '') : initialValue;

  const [value, setValue] = useState(initial);

  const setStoredValue = (newValue) => {
    setValue(newValue);
    window.localStorage.setItem(key, newValue); // Save as a plain string
  };

  return [value, setStoredValue];
};

export default useLocalStorage;
