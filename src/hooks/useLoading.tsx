import { useState, useCallback } from "react";

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const loading = useCallback(() => {
    setIsLoading(true);
  }, []);

  return { isLoading, loading, stopLoading };
}
