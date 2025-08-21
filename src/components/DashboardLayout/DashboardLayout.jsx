import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './DashboardLayout.css'

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <nav>
          <ul>
            {user ? (
              <>
                <li><span>welcome,</span><strong>{user.fullName}</strong></li>
                <li><Link to="profile">Edit Profile</Link></li>
                <li><Link to="recipes">My Recipes</Link></li>
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

      {/* Main content area */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
