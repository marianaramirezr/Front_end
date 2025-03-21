import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/media";

const useMediaStore = create((set) => ({
  media: [],
  loading: false,
  error: null,
  message: null,

  fetchMedia: async () => {
    set({ loading: true, error: null, message: null });
    try {
      const res = await axios.get(API_URL);
      set({ media: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "❌ Error al cargar medios",
        loading: false,
      });
      console.error("❌ Error al obtener media:", error);
    }
  },

  addMedia: async (newMovie) => {
    set({ loading: true, error: null, message: null });
    try {
      console.log("➕ Agregando película:", newMovie);
      const res = await axios.post(API_URL, newMovie);
      set((state) => ({
        media: [...state.media, res.data], 
        message: "✅ Película agregada con éxito",
        loading: false,
      }));
      return res.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "❌ Error al agregar media",
        loading: false,
      });
      console.error("❌ Error al agregar media:", error);
      return null;
    }
  },

  getMediaById: async (id) => {
    set({ loading: true, error: null, message: null });
    try {
      console.log("🔍 Buscando película con ID:", id);
      const res = await axios.get(`${API_URL}/${id}`);
      set({ loading: false });
      return res.data; 
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          `❌ No se encontró la película con ID ${id}`,
        loading: false,
      });
      console.error(`❌ Error al buscar película con ID ${id}:`, error);
      return null;
    }
  },

  updateMedia: async (id, updatedMedia) => {
    set({ loading: true, error: null, message: null });
    try {
      console.log("🛠️ Actualizando ID:", id, updatedMedia);
      const res = await axios.put(`${API_URL}/${id}`, updatedMedia);
      set((prevState) => ({
        media: prevState.media.map((m) =>
          m.id === id ? { ...m, ...res.data } : m
        ), 
        message: "✅ Media actualizada con éxito",
        loading: false,
      }));
      return res.data; 
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "❌ Error al actualizar media",
        loading: false,
      });
      console.error("❌ Error al actualizar media:", error);
      return null;
    }
  },

  deleteMedia: async (id) => {
    set({ loading: true, error: null, message: null });
    try {
      console.log("🗑️ Eliminando ID:", id);
      await axios.delete(`${API_URL}/${id}`);
      set((prevState) => ({
        media: prevState.media.filter((m) => m.id !== id), 
        message: "🗑️ Media eliminada con éxito",
        loading: false,
      }));
      return true;
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "❌ Error al eliminar media",
        loading: false,
      });
      console.error("❌ Error al eliminar media:", error);
      return false;
    }
  },
}));

export default useMediaStore;
