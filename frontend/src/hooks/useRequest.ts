import { useCallback, useState } from "react";

type Method = "get" | "post" | "put" | "delete";

type MakeRequest = {
  url: string;
  method: Method;
  body?: Record<string, any>;
  headers?: Record<string, string>;
};

const useRequest = () => {
  const [loading, setLoading] = useState(false);

  const makeRequest = useCallback(
    async ({ url, method, body, headers = {} }: MakeRequest) => {
      setLoading(true);

      try {
        // Construct full headers
        const requestHeaders = {
          ...headers,
          Accept: "application/json",
          "Content-Type": "application/json"
        };

        // Prepare request options
        const requestOptions: RequestInit = {
          method: method.toUpperCase(),
          headers: requestHeaders,
          ...(body ? { body: JSON.stringify(body) } : {})
        };

        // Perform fetch request
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}${url}`,
          requestOptions
        );

        // Handle non-OK responses
        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, body: ${errorBody}`
          );
        }

        // Parse and return response data
        const data = await response.json();

        setLoading(false);

        return data;
      } catch (err) {
        console.log(
          `makeRequest Error: url:([${method}]:${
            import.meta.env.VITE_API_URL
          }${url}) body(${JSON.stringify(body)}), headers(${JSON.stringify(
            headers
          )})`,
          err instanceof Error ? err.message : err
        );

        setLoading(false);
        throw err;
      }
    },
    [setLoading]
  );

  return { makeRequest, loading };
};

export default useRequest;
