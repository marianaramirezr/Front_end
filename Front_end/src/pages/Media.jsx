import { useEffect } from "react";
import useMoviesStore from "../store/moviesStore";
import MovieCard from "../components/MovieCard";

const Media = () => {
  const { movies, fetchMovies, cargando, error } = useMoviesStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  console.log("🎬 Películas obtenidas:", movies); 

  return (
    <div className="media-container">
      <h1>Catálogo de Películas</h1>

      {cargando && <p>Cargando películas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          !cargando && <p>No hay películas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Media;
