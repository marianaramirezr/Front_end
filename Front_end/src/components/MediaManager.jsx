import React, { useEffect, useState } from "react";
import useMediaStore from "../store/useMediaStore"; 

const MediaManager = () => {
  const { media, fetchMedia, addMedia, updateMedia, deleteMedia } = useMediaStore();
  const [form, setForm] = useState({ title: "", description: "", releaseYear: "", genreId: "", directorId: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateMedia(editingId, form);
      setEditingId(null);
    } else {
      addMedia(form); 
    }
    setForm({ title: "", description: "", releaseYear: "", genreId: "", directorId: "" });
  };

  return (
    <div>
      <h2>🎬 Gestión de Películas</h2>
      
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        
        <textarea name="description" placeholder="Descripción" value={form.description || ""} onChange={handleChange} />

        <input type="number" name="releaseYear" placeholder="Año de lanzamiento" value={form.releaseYear} onChange={handleChange} />
        <input type="number" name="genreId" placeholder="Género ID" value={form.genreId} onChange={handleChange} />
        <input type="number" name="directorId" placeholder="Director ID" value={form.directorId} onChange={handleChange} />
        
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: "", description: "", releaseYear: "", genreId: "", directorId: "" }); }}>Cancelar</button>}
      </form>

      <ul>
        {media.map((m) => (
          <li key={m.id}>
            {m.title} ({m.releaseYear})
            <button onClick={() => { setForm(m); setEditingId(m.id); }}>✏️ Editar</button>
            <button onClick={() => deleteMedia(m.id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaManager; 
