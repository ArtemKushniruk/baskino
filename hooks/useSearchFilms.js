import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL, API_KEY } from '../constants/API';

export default function useSearchFilms(keywords) {
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [films, setFilms] = useState([]);

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(() => {
    setFilms([]);
    setPage(1);
    setShouldFetch(true);
  }, [keywords]);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    if (!keywords) {
      return;
    }

    const fetch = async () => {
      const { data } = await axios({
        method: 'GET',
        url: `${API_URL}/search/movie`,
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: { page: page, query: keywords },
      });

      setShouldFetch(false);
      setFilms((prevFilms) => [...prevFilms, ...data.results]);
      setPage(page + 1);
    };

    fetch();
  }, [page, keywords, shouldFetch]);

  return [films, fetchMore];
}
