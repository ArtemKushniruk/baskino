import genres from '../constants/genres';

export default function useGenres(ids) {
  let str = '';

  ids.map((id, index) => {
    genres.map((genre) => (id === genre.id ? (str += `${genre.name}`) : null));
    index !== ids.length - 1 ? (str += ', ') : null;
  });

  return str;
}
