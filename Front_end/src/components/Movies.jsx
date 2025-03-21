import { useEffect, useState, useCallback } from "react";
import useMediaStore from "../store/useMediaStore"; 
import axios from "axios"; 
import "./Movies.css"; 

export default function Movies() {
  const { media, fetchMedia, loading, error } = useMediaStore();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [director, setDirector] = useState("Cargando...");
  const [genero, setGenero] = useState("Cargando...");
  const [productora, setProductora] = useState("Cargando..."); // 🔹 Agregado

  const fetchMovies = useCallback(() => {
    fetchMedia();
  }, [fetchMedia]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (!selectedMovie) return;
  
    const abortController = new AbortController();
    const signal = abortController.signal;
  
    const fetchDetails = async () => {
      try {
        if (selectedMovie.director_id) {
          const resDirector = await axios.get(
            `http://localhost:4000/directores/${selectedMovie.director_id}`,
            { signal }
          );
          setDirector(resDirector.data.nombre || "Desconocido");
        } else {
          setDirector("Desconocido");
        }
  
        if (selectedMovie.genero_id) {
          const resGenero = await axios.get(
            `http://localhost:4000/generos/${selectedMovie.genero_id}`,
            { signal }
          );
          setGenero(resGenero.data.nombre || "Desconocido");
        } else {
          setGenero("Desconocido");
        }

        if (selectedMovie.productora_id) {
          const resProductora = await axios.get(
            `http://localhost:4000/productoras/${selectedMovie.productora_id}`,
            { signal }
          );
          setProductora(resProductora.data.nombre || "Desconocido");
        } else {
          setProductora("Desconocido");
        }

      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error obteniendo detalles:", error);
          setDirector("Desconocido");
          setGenero("Desconocido");
          setProductora("Desconocido"); // 🔹 Agregado
        }
      }
    };
  
    fetchDetails();
    return () => abortController.abort();
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
          <p><strong>Año:</strong> {selectedMovie.anio || "2025"}</p>
          <p><strong>Director:</strong> {director}</p>
          <p><strong>Género:</strong> {genero}</p>
          <p><strong>Productora:</strong> {productora}</p>
          <button onClick={() => setSelectedMovie(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}
