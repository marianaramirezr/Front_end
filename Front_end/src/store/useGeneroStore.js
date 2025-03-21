import { create } from "zustand";

const useGeneroStore = create((set) => ({
  generos: [],
  fetchGeneros: async () => {
    try {
      const response = await fetch("http://localhost:4000/generos"); 
      const data = await response.json();
      set({ generos: data });
    } catch (error) {
      console.error("Error al obtener géneros:", error);
    }
  },
}));

export default useGeneroStore; 
