import { create } from "zustand";

const useGeneroStore = create((set) => ({
  generos: [],
  fetchGeneros: async () => {
    try {
      const response = await fetch("https://api-rest-efe4.onrender.com/generos"); 
      const data = await response.json();
      set({ generos: data });
    } catch (error) {
      console.error("Error al obtener géneros:", error);
    }
  },
}));

export default useGeneroStore; 
