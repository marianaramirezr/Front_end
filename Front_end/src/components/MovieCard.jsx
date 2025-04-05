import { useEffect, useState } from "react";
import "../App.css";

const MovieCard = ({ movie }) => {
  const [infoPelicula, setInfoPelicula] = useState({
    director: "Cargando...",
    año: "No disponible",
    genero: "Cargando...",
    sinopsis: "No disponible",
  });

  const obtenerInformacionDirector = async (idDirector) => {
    try {
      const response = await fetch(`https://api-rest-efe4.onrender.com/directores${idDirector}`);
      const data = await response.json();
      return data.nombre; 
    } catch (error) {
      console.error("Error obteniendo el director:", error);
      return "Desconocido";
    }
  };

  const obtenerInformacionGenero = async (idGenero) => {
    try {
      const response = await fetch(`https://api-rest-efe4.onrender.com/generos${idGenero}`);
      const data = await response.json();
      return data.nombre; 
    } catch (error) {
      console.error("Error obteniendo el género:", error);
      return "Desconocido";
    }
  };

  useEffect(() => {
    if (!movie.director_id || !movie.genero_id) {
      console.error("❌ Error: ID inválido en movie", movie);
      return;
    }

    console.log("🔍 Solicitando info del director y género...");

    const abortController = new AbortController();

    const fetchMovieData = async () => {
      try {
        const [directorData, generoData] = await Promise.all([
          obtenerInformacionDirector(movie.director_id),
          obtenerInformacionGenero(movie.genero_id),
        ]);

        setInfoPelicula({
          director: directorData || "Desconocido",
          año: movie.año || "No disponible",
          genero: generoData || "Desconocido",
          sinopsis: movie.sinopsis || "No disponible",
        });

      } catch (error) {
        console.error("❌ Error obteniendo la información:", error);

        setInfoPelicula({
          director: "Desconocido",
          año: movie.año || "No disponible",
          genero: "Desconocido",
          sinopsis: movie.sinopsis || "No disponible",
        });
      }
    };

    fetchMovieData();

    return () => abortController.abort();
  }, [movie.director_id, movie.genero_id]);

  return (
    <div className="movie-card">
      <img src={movie.imagen} alt={movie.titulo} className="movie-image" />
      <div className="movie-info">
        <h3>{movie.titulo}</h3>
        <p><strong>Año:</strong> {infoPelicula.año}</p>
        <p><strong>Director:</strong> {infoPelicula.director}</p>
        <p><strong>Género:</strong> {infoPelicula.genero}</p>
      </div>
    </div>
  );
};

export default MovieCard;
