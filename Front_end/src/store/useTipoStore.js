import { create } from "zustand";

const useTipoStore = create((set) => ({
  tipos: [],
  loading: false,
  error: null,

  cargarTipos: async () => {
    set({ loading: true, error: null }); 

    try {
      const response = await fetch("http://localhost:4000/tipos");
      if (!response.ok) throw new Error("Error al obtener los tipos");
      
      const data = await response.json();
      set({ tipos: data, loading: false });
    } catch (error) {
      console.error("Error al cargar los tipos:", error);
      set({ error: error.message, loading: false });
    }
  },
}));

export default useTipoStore;
