import { useEffect } from "react";
import useProductoraStore from "../store/useProductoraStore";

export default function Productoras() {
  const { productoras, cargarProductoras, loading, error } = useProductoraStore();

  useEffect(() => {
    cargarProductoras();
  }, [cargarProductoras]); 

  return (
    <div>
      <h1>Productoras</h1>

      {loading && <p>Cargando productoras...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {productoras.length > 0 ? (
            productoras.map((productora) => (
              <li key={productora.id}>{productora.nombre}</li>
            ))
          ) : (
            <p>No hay productoras registradas.</p>
          )}
        </ul>
      )}
    </div>
  );
}
