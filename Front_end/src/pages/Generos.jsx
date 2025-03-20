import React, { useEffect } from "react";
import  useGeneroStore  from "../store/useGeneroStore"; 

const Generos = () => {
  const { generos, fetchGeneros } = useGeneroStore();

  useEffect(() => {
    fetchGeneros();
  }, []);

  return (
    <div>
      <h2>🎭 Géneros de Películas</h2>
      <ul>
        {generos.map((genero) => (
          <li key={genero.id}>{genero.nombre}</li> 
        ))}
      </ul>
    </div>
  );
};

export default Generos;
