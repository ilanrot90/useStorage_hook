import { useState, useEffect } from "react";

const handleStorageError = (e: Error) => {
  console.log("error with localStorage: ", e.message);
};

type ReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>
];

export const useStorage = <T extends {} /*or <T,>*/>(
  key: string,
  initialValue?: T
): ReturnType<T> => {
  const [value, setValue] = useState<T | undefined>(() => {
    if (typeof initialValue === "undefined") return;
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      handleStorageError(e);
      return initialValue;
    }
  });

  useEffect(() => {
    if (value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        handleStorageError(e);
      }
    }
  }, [value, key]);

  return [value, setValue];
};
