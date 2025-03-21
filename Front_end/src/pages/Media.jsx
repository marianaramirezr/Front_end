import { useEffect } from "react";
import useMediaStore from "../store/useMediaStore";

const Media = () => {
  const { media, loading, error, fetchMedia } = useMediaStore();

  useEffect(() => {
    fetchMedia();
  }, []);

  if (loading) return <p>⏳ Cargando películas...</p>;
  if (error) return <p>❌ Error: {error}</p>;
  if (!media || !Array.isArray(media) || media.length === 0) {
    return <p>📭 No hay películas disponibles.</p>;
  }

  return (
    <div>
      <h2>🎬 Lista de Películas</h2>
      <ul>
        {media.map((movie) => (
          <li key={movie.id}>{movie.titulo}</li>
        ))}
      </ul>
    </div>
  );
};

export default Media;
