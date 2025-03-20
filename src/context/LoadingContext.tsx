import React, { createContext, useContext, useState, useCallback } from "react";

// 1️⃣ Tạo context
const LoadingContext = createContext({
  isLoading: false,
  loading: () => {},
  stopLoading: () => {},
});

// 2️⃣ Tạo Provider
export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const loading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return (
    <LoadingContext.Provider value={{ isLoading, loading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
export const useLoadingContext = () => useContext(LoadingContext);
