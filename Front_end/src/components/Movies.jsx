import { useEffect, useState, useCallback } from "react";
import useMediaStore from "../store/useMediaStore"; 
import axios from "axios"; 
import "./Movies.css"; 

export default function Movies() {
  const { media, fetchMedia, loading, error } = useMediaStore();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [director, setDirector] = useState("Cargando...");

  const fetchMovies = useCallback(() => {
    fetchMedia();
  }, [fetchMedia]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (!selectedMovie) return;
    
    const fetchDirector = async () => {
      if (!selectedMovie.director_id) {
        setDirector("Desconocido");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:4000/directores/${selectedMovie.director_id}`);
        setDirector(res.data.nombre || "Desconocido");
      } catch (error) {
        setDirector("Desconocido");
      }
    };

    fetchDirector();
  }, [selectedMovie]);

  return (
    <div className="movies-page">
      <h1>🎬 Catálogo de Películas</h1>

      
      {loading && <p className="loading">Cargando películas...</p>}

    
      {error && <p className="error">Error: {error}</p>}

      
      {!loading && !error && media.length > 0 ? (
        <div className="movies-container">
          {media.map((movie) => (
            <div 
              key={movie.id} 
              className="movie-card"
              onClick={() => setSelectedMovie(movie)}
              role="button"
              aria-label={`Ver detalles de ${movie.titulo}`}
            >
              <img src={movie.imagen} alt={movie.titulo} />
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="no-movies">No hay películas disponibles.</p>
      )}

      
      {selectedMovie && (
        <div className="movie-dialog">
          <h2>{selectedMovie.titulo}</h2>
          <p><strong>Sinopsis:</strong> {selectedMovie.sinopsis || "Sin sinopsis disponible"}</p>
          <p><strong>Año:</strong> {selectedMovie.anio || "Desconocido"}</p>
          <p><strong>Director:</strong> {director}</p>
          <p><strong>Género:</strong> {selectedMovie.genero || "No especificado"}</p>
          <button onClick={() => setSelectedMovie(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}
