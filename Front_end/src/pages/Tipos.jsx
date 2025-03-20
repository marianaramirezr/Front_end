import { useEffect } from "react";
import useTipoStore from "../store/useTipoStore";

export default function Tipos() {
  const { tipos, cargarTipos, loading, error } = useTipoStore();

  useEffect(() => {
    if (tipos.length === 0) {
      cargarTipos();
    }
  }, [tipos.length]); 

  return (
    <div>
      <h1>Tipos de Contenido</h1>

      {loading && <p>Cargando tipos...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {tipos.length > 0 ? (
            tipos.map((tipo) => (
              <li key={tipo.id}>{tipo.nombre}</li>
            ))
          ) : (
            <p>No hay tipos registrados.</p>
          )}
        </ul>
      )}
    </div>
  );
}
