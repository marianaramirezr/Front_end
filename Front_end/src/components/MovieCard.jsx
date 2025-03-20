import { useEffect, useState } from "react";
import "../App.css";
import { obtenerInformacionMedia } from "../pages/ManageMovies"; 

const MovieCard = ({ movie }) => {
  const [infoPelicula, setInfoPelicula] = useState({
    director: "Cargando...",
    año: "No disponible",
    sinopsis: "No disponible",
  });

  useEffect(() => {
    if (!movie.director_id) {
      console.error("❌ Error: movie.director_id es inválido", movie);
      return;
    }

    console.log("🔍 Solicitando info del director con ID:", movie.director_id); 

    const abortController = new AbortController();

    const fetchMovieData = async () => {
      try {
        const data = await obtenerInformacionMedia(movie.director_id, abortController.signal);

        setInfoPelicula({
          director: data.nombre || "Desconocido",
          año: movie.año || "No disponible", 
          sinopsis: movie.sinopsis || "No disponible",
        });

      } catch (error) {
        console.error("❌ Error obteniendo la información del director:", error);

        setInfoPelicula({
          director: "Desconocido",
          año: movie.año || "No disponible",
          sinopsis: movie.sinopsis || "No disponible",
        });
      }
    };

    fetchMovieData();

    return () => abortController.abort();
  }, [movie.director_id]); 

  return (
    <div className="movie-card">
      <img src={movie.imagen} alt={movie.titulo} className="movie-image" />
      <div className="movie-info">
        <h3>{movie.titulo}</h3>
        <p><strong>Año:</strong> {infoPelicula.año}</p>
        <p><strong>Director:</strong> {infoPelicula.director}</p>
        <p><strong>Sinopsis:</strong> {infoPelicula.sinopsis}</p>
      </div>
    </div>
  );
};

export default MovieCard;
