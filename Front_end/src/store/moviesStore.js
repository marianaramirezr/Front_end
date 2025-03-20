import { create } from "zustand";
import axios from "axios";

const useMoviesStore = create((set) => ({
  movies: [],
  cargando: false,
  error: null,

  fetchMovies: async () => {
    set({ cargando: true, error: null });
    try {
      const response = await axios.get("http://localhost:4000/media");
      set({ movies: response.data });
    } catch (error) {
      set({ error: "Error al cargar películas" });
    } finally {
      set({ cargando: false });
    }
  },

  addMovie: async (movie) => {
    try {
      const response = await axios.post("http://localhost:4000/media", movie);
      set((state) => ({ movies: [...state.movies, response.data] }));
    } catch (error) {
      console.error("Error al agregar película", error);
    }
  },

  deleteMovie: async (id) => {
    try {
      await axios.delete(`http://localhost:4000/media/${id}`);
      set((state) => ({ movies: state.movies.filter((movie) => movie.id !== id) }));
    } catch (error) {
      console.error("Error al eliminar película", error);
    }
  },
}));

export default useMoviesStore;
