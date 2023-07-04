import React, { useEffect, useState } from "react";
import "./css/Row.css";
import axios from "./axios";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          if (
            (isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)
          ) {
            return (
              <img
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                key={movie.id}
                src={
                  base_url +
                  (isLargeRow ? movie.poster_path : movie.backdrop_path)
                }
                alt={movie.original_title}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default Row;
