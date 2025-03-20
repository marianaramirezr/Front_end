import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout"; 
import Movies from "./components/Movies";

const Generos = lazy(() => import("./pages/Generos"));
const Directores = lazy(() => import("./pages/Directores"));
const Productoras = lazy(() => import("./pages/Productoras"));
const Tipos = lazy(() => import("./pages/Tipos"));
const Media = lazy(() => import("./pages/Media"));
const ManageMovies = lazy(() => import("./pages/ManageMovies"));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<h2>Cargando...</h2>}>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/generos" element={<Generos />} />
          <Route path="/directores" element={<Directores />} />
          <Route path="/productoras" element={<Productoras />} />
          <Route path="/tipos" element={<Tipos />} />
          <Route path="/media" element={<Media />} />
          <Route path="/movies" element={<ManageMovies />} />
          <Route path="*" element={<Navigate to="/" replace />} /> 
        </Routes>
      </Suspense>
    </Layout>
  );
}
