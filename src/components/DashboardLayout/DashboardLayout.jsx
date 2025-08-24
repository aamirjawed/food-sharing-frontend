import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

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
                <li><Link to="my-collections">My Collections</Link></li>
               
                <button onClick={handleLogout} className="logout-btn">Log out</button>
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