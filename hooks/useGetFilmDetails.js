import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL, API_KEY } from '../constants/API';

export default function useGetFilmDetails(id) {
  const [details, setDetails] = useState([]);
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios({
        method: 'GET',
        url: `${API_URL}/movie/${id}`,
        headers: { Authorization: `Bearer ${API_KEY}` },
      });

      setDetails(data);
    };

    const fetchCredits = async () => {
      const { data } = await axios({
        method: 'GET',
        url: `${API_URL}/movie/${id}/credits`,
        headers: { Authorization: `Bearer ${API_KEY}` },
      });

      setCredits(data);
    };

    const fetchVideos = async () => {
      const { data } = await axios({
        method: 'GET',
        url: `${API_URL}/movie/${id}/videos`,
        headers: { Authorization: `Bearer ${API_KEY}` },
      });

      const trailers = []
      data.results.map(e => e.type === 'Trailer' ? trailers.push(e) : null)

      setVideos(trailers);
    };

    fetchDetails();
    fetchCredits();
    fetchVideos();
  }, [id]);

  return [details, credits, videos];
}
