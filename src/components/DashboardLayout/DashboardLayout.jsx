import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './DashboardLayout.css';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button className={`dashboard-toggle-btn ${open ? "hidden" : ""}`} onClick={() => setOpen(true)}>
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${open ? "open" : ""}`}>
        {/* Close Button */}
        <button className="dashboard-close-btn" onClick={() => setOpen(false)}>
          ❌
        </button>

        <nav>
          <ul>
            {user ? (
              <>
                <li><span>Welcome,</span><strong>{user.fullName}</strong></li>
                <li><Link to="profile">Edit Profile</Link></li>
                <li><Link to="/my-recipes">My Recipes</Link></li>
                <li><Link to="collections">My Collections</Link></li>
                <li><Link to="reviews">My Reviews</Link></li>
                <li><Link to="/logout">Log out</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Log In</Link></li>
              </>
            )}
          </ul>
        </nav>
      </aside>

      {/* Overlay */}
      {open && <div className="dashboard-overlay" onClick={() => setOpen(false)}></div>}

      {/* Main content */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;