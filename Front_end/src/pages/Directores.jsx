import React, { useEffect } from "react";
import useDirectoresStore from "../store/useDirectorStore"; 


const Directores = () => {
  const { directores, fetchDirectores } = useDirectoresStore(); 
  useEffect(() => {
    fetchDirectores(); 
  }, [fetchDirectores]);

  return (
    <div>
      <h2>Lista de Directores 🎬</h2>
      {directores.length > 0 ? (
        <ul>
          {directores.map((director) => (
            <li key={director.id}>{director.nombre}</li> 
          ))}
        </ul>
      ) : (
        <p>No hay directores disponibles.</p>
      )}
    </div>
  );
};

export default Directores;
