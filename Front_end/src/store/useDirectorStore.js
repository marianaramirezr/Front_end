import { create } from "zustand";

const useDirectoresStore = create((set) => ({
  directores: [],
  fetchDirectores: async () => {
    try {
      const response = await fetch("http://localhost:4000/directores"); // Asegúrate de que la URL es correcta
      const data = await response.json();
      set({ directores: data });
    } catch (error) {
      console.error("Error al obtener directores:", error);
    }
  },
}));

export default useDirectoresStore;
