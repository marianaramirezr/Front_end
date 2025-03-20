import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/media"; // ✅ Centraliza la URL

const useMediaStore = create((set) => ({
  media: [],
  loading: false,
  error: null,
  message: null, // ✅ Para mostrar mensajes de éxito

  // 🟢 Obtener todas las películas/series
  fetchMedia: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(API_URL);
      set({ media: res.data, loading: false });
    } catch (error) {
      set({ error: "Error al cargar medios", loading: false });
      console.error("❌ Error al obtener media:", error);
    }
  },

  // 🟢 Agregar una nueva película/serie
  addMedia: async (newMedia) => {
    set({ error: null, message: null }); // ✅ Resetea mensajes previos
    try {
      const res = await axios.post(API_URL, newMedia);
      set((state) => ({
        media: [...state.media, { ...newMedia, id: res.data.id }],
        message: "🎉 Media agregada con éxito",
      }));
    } catch (error) {
      set({ error: "❌ Error al agregar media" });
      console.error("Error al agregar media:", error);
    }
  },

  // 🟢 Actualizar una película/serie
  updateMedia: async (id, updatedMedia) => {
    console.log("🛠️ Actualizando ID:", id, updatedMedia);
    set({ error: null, message: null });

    try {
      await axios.put(`${API_URL}/${id}`, updatedMedia);
      set((state) => ({
        media: state.media.map((m) => (m.id === id ? { ...m, ...updatedMedia } : m)),
        message: "✅ Media actualizada con éxito",
      }));
    } catch (error) {
      console.error("❌ Error al actualizar media:", error);
      set({ error: "Error al actualizar media" });
    }
  },

  // 🟢 Eliminar una película/serie
  deleteMedia: async (id) => {
    console.log("🗑️ Eliminando ID:", id);
    set({ error: null, message: null });

    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        media: state.media.filter((m) => m.id !== id),
        message: "🗑️ Media eliminada con éxito",
      }));
    } catch (error) {
      console.error("❌ Error al eliminar media:", error);
      set({ error: "Error al eliminar media" });
    }
  },
}));

export default useMediaStore; // ✅ Exportación correcta
