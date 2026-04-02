import { useState, useEffect } from "react";

export default function useFetchMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch('http://localhost:8080/movies')
        .then(res => res.json());

      setMovies(data);
    }
    fetchData();
  }, [])
  return { movies, setMovies }
}