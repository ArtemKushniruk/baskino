import axios from 'axios';
import { API_URL, API_KEY } from '../constants/API';
import { useState, useEffect } from 'react';

export default function useGetFilmList() {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API_URL}/movie/popular`,
      headers: { Authorization: `Bearer ${API_KEY}` },
    }).then((res) => {
      if (res.data.results.length !== 0) {
        setFilms(res.data);
        setTimeout(() => setLoading(false), 1000)
      }
    });
  }, []);

  return { films, loading };
}
