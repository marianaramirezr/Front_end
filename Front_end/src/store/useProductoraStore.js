import { create } from "zustand";

const useProductoraStore = create((set) => ({
  productoras: [],
  loading: false,
  error: null,

  cargarProductoras: async () => {
    set({ loading: true, error: null }); 

    try {
      const response = await fetch("http://localhost:4000/productoras");

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      set({ productoras: data, loading: false }); 
    } catch (error) {
      console.error("Error al cargar las productoras:", error);
      set({ error: error.message, loading: false }); 
    }
  },
}));

export default useProductoraStore;
