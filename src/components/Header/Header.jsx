
import { NavLink } from "react-router-dom";
import "./Header.css";


const Header = () => {
  

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-name">Foodsy</h1>
        <p className="slogan">Foodsy: Share the Bite</p>
      </div>

      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
};

export default Header;
