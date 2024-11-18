'use client';

import { useCallback, useEffect, useState } from "react";

type FetchHookReturn<T> = 
{
    data: null;
    error: null;
    isFetching: true;
    refetch: () => void;
} | {
    data: null;
    error: Error;
    isFetching: false;
    refetch: () => void;
} | {
    data: T;
    error: null;
    isFetching: false;
    refetch: () => void;
}


export default function useFetchJson<T = Error>(url: string): FetchHookReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<unknown | null>(null);
    const [version, setVersion] = useState(Date.now());

    const refetch = useCallback(() => {
        setVersion(Date.now());
    }, []);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchFn = async () => {
            setIsFetching(true);
            setError(null);
            setData(null);
            try {
                const data = await fetch(url, { signal: abortController.signal }).then((response) => response.json())
                setData(data)
            } catch (err) {
                setData(null);
                setError(err);
            } finally {
                setIsFetching(false);
            }
        }
        fetchFn();

        return () => {
            abortController.abort({ name: 'AbortError', message: "Fetch aborted" } satisfies Error);
        }
    }, [url, version]);

    return { data, isFetching, error, refetch } as FetchHookReturn<T>;
};
