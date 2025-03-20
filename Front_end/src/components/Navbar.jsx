import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/layout">Inicio</NavLink></li>
        <li><NavLink to="/generos">Géneros</NavLink></li>
        <li><NavLink to="/directores">Directores</NavLink></li>
        <li><NavLink to="/productoras">Productoras</NavLink></li>
        <li><NavLink to="/tipos">Tipos</NavLink></li>
        <li><NavLink to="/media">Media</NavLink></li>
        <li><NavLink to="/movies">Gestionar Películas</NavLink></li>
      </ul>
    </nav>
  );
}
