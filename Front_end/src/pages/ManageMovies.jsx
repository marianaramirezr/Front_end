import React, { useEffect, useState } from "react";
import useMediaStore from "../store/useMediaStore";
import "./ManageMovies.css"; 
import axios from "axios";
  
export const obtenerInformacionMedia = async (id, signal) => {
  const res = await axios.get(`http://localhost:4000/directores/${id}`, { signal });
  return res.data;
};


const ManageMovies = () => {
  const { media, fetchMedia, addMedia, updateMedia, deleteMedia, loading, error } = useMediaStore();

  const [titulo, setTitulo] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [sinopsis, setSinopsis] = useState(""); 
  const [director, setDirector] = useState("");
  const [genero, setGenero] = useState("");
  const [productora, setProductora] = useState("");
  const [tipo, setTipo] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  useEffect(() => {
    if (!loading) {
      setEditingId(null);
    }
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !imagenUrl || !sinopsis || !director || !genero || !productora || !tipo) {
      console.error("❌ Error: Todos los campos son obligatorios.");
      return;
    }

    const movieData = {
      titulo,
      imagen: imagenUrl,
      sinopsis, 
      director_id: Number(director),
      genero_id: Number(genero),
      productora_id: Number(productora),
      tipo_id: Number(tipo),
    };

    console.log("🎬 Enviando datos a la API:", movieData);

    if (editingId) {
      updateMedia(editingId, movieData);
      setEditingId(null);
    } else {
      addMedia(movieData);
    }

    setTitulo("");
    setImagenUrl("");
    setSinopsis(""); 
    setDirector("");
    setGenero("");
    setProductora("");
    setTipo("");
  };

  return (
    <div className="manage-movies-container">
      <h2>🎬 Gestionar Películas</h2>

      {loading && <p className="text-yellow-400">Cargando películas...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

      <form onSubmit={handleSubmit} className="movie-form">
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título de la película" required />
        
        <input type="text" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} placeholder="URL de la imagen" required />

        <textarea value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} placeholder="Escribe una breve sinopsis..." required />

        <select value={director || ""} onChange={(e) => setDirector(Number(e.target.value))} required>
          <option value="" disabled>Selecciona un Director</option>
          <option key={1} value="1">Christopher Nolan</option>
          <option key={2} value="2">Tom McGrath</option>
        </select>

        <select value={genero || ""} onChange={(e) => setGenero(Number(e.target.value))} required>
          <option value="" disabled>Selecciona un Género</option>
          <option key={1} value="1">Acción</option>
          <option key={2} value="2">Drama</option>
          <option key={3} value="3">Comedia</option>
        </select>

        <select value={productora || ""} onChange={(e) => setProductora(Number(e.target.value))} required>
          <option value="" disabled>Selecciona una Productora</option>
          <option key={1} value="1">Warner Bros</option>
          <option key={2} value="2">Universal</option>
        </select>

        <select value={tipo || ""} onChange={(e) => setTipo(Number(e.target.value))} required>
          <option value="" disabled>Selecciona un Tipo</option>
          <option key={1} value="1">Película</option>
          <option key={2} value="2">Serie</option>
        </select>

        <button type="submit" disabled={loading}>{editingId ? "Actualizar" : "Agregar"}</button>

        {editingId && (
          <button onClick={() => { 
            setEditingId(null);
            setTitulo("");
            setImagenUrl("");
            setSinopsis("");
            setDirector("");
            setGenero("");
            setProductora("");
            setTipo("");
          }} className="cancel-button">
            ❌ Cancelar
          </button>
        )}
      </form>

      <ul className="movies-list">
        {media.length > 0 ? (
          media.map((m) => (
            <li key={m.id} className="movie-card">
              <img src={m.imagen} alt={m.titulo} className="movie-image" />
              <div className="movie-info">
                <h3>{m.titulo}</h3>
                <p className="sinopsis">{m.sinopsis}</p>
              </div>
              <div className="buttons">
                <button 
                  onClick={() => { 
                    setTitulo(m.titulo);
                    setImagenUrl(m.imagen);
                    setSinopsis(m.sinopsis);
                    setDirector(m.director_id);
                    setGenero(m.genero_id);
                    setProductora(m.productora_id);
                    setTipo(m.tipo_id);
                    setEditingId(m.id);
                  }} 
                  className="edit-button"
                >
                  ✏️ Editar
                </button>
                <button onClick={() => deleteMedia(m.id)} className="delete-button">🗑️ Eliminar</button>
              </div>
            </li>
          ))
        ) : (
          !loading && <p className="no-movies">No hay películas disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default ManageMovies;
