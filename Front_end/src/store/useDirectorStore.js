import { create } from "zustand";

const useDirectoresStore = create((set) => ({
  directores: [],
  fetchDirectores: async () => {
    try {
      const response = await fetch("https://api-rest-efe4.onrender.com/directores"); 
      const data = await response.json();
      set({ directores: data });
    } catch (error) {
      console.error("Error al obtener directores:", error);
    }
  },
}));

export default useDirectoresStore;
