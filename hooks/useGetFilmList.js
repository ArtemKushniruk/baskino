import axios from 'axios';
import { API_URL, API_KEY } from '../constants/API';
import { useState, useEffect, useCallback } from 'react';

export default function useGetFilmList() {
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [films, setFilms] = useState([]);

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const fetch = async () => {
      const { data } = await axios({
        method: 'GET',
        url: `${API_URL}/movie/popular`,
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: { page: page },
      });

      setShouldFetch(false);
      setFilms((prevFilms) => [...prevFilms, ...data.results]);
      setPage(page + 1);
    };

    fetch();
  }, [page, shouldFetch]);

  return [films, fetchMore];
}
