import { useState, useCallback } from "react";

// Generic type for API response
type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// Options for fetch requests
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Reusable API hook
const useApi = <TResponse, TRequest = unknown>(baseUrl: string) => {
  const [response, setResponse] = useState<ApiResponse<TResponse>>({
    data: null,
    loading: false,
    error: null,
  });

  // Helper function to perform fetch requests
  const performFetch = useCallback(
    async (
      endpoint: string,
      method: string,
      body?: TRequest,
      options: FetchOptions = {}
    ): Promise<TResponse> => {
      setResponse((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const url = `${baseUrl}${endpoint}`;
        const fetchOptions: FetchOptions = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        };

        if (body) {
          fetchOptions.body = JSON.stringify(body);
        }

        const res = await fetch(url, fetchOptions);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data: TResponse = await res.json();
        setResponse({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setResponse({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    [baseUrl]
  );

  // GET all items
  const getAll = useCallback(
    async (endpoint: string = "", options: FetchOptions = {}) => {
      return performFetch(endpoint, "GET", undefined, options);
    },
    [performFetch]
  );

  // GET single item by ID
  const get = useCallback(
    async (id: string | number, endpoint: string = "", options: FetchOptions = {}) => {
      return performFetch(`${endpoint}/${id}`, "GET", undefined, options);
    },
    [performFetch]
  );

  // POST new item
  const post = useCallback(
    async (data: TRequest, endpoint: string = "", options: FetchOptions = {}) => {
      return performFetch(endpoint, "POST", data, options);
    },
    [performFetch]
  );

  // PUT (update item by ID)
  const put = useCallback(
    async (data: TRequest, endpoint: string = "", options: FetchOptions = {}) => {
      console.log('called')
      return performFetch(endpoint, "PUT", data, options);
    },
    [performFetch]
  );

  // DELETE item by ID
  const deleteItem = useCallback(
    async (id: string | number, endpoint: string = "", options: FetchOptions = {}) => {
      return performFetch(`${endpoint}/${id}`, "DELETE", undefined, options);
    },
    [performFetch]
  );

  return {
    data: response.data,
    loading: response.loading,
    error: response.error,
    getAll,
    get,
    post,
    put,  // Exposing the PUT function
    deleteItem,
  };
};

export default useApi;
