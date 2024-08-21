import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CSurfer } from '../CSurfer/CSufer';
import './Header.css';

export const Header = () => {
  const { passport, setPassport } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("passport");
    setPassport(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
      <div className="container">
        <a
          className="navbar-brand"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <span className="red">SOCIAL</span>NETWORK
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <CSurfer path="/" content="Home" />
            </li>
            <li className="nav-item">
              <CSurfer path="/profile" content="Profile" />
            </li>
            <li className="nav-item">
              <CSurfer path="/createPost" content="CreatePost" />
            </li>
            <li className="nav-item">
              <CSurfer path="/allPosts" content="AllPosts" />
            </li>
            {passport && passport.token && passport.tokenData?.role === "admin" && (
              <li className="nav-item">
                <CSurfer path="/admin" content="Admin" />
              </li>
            )}
            {passport && passport.token ? (
              <li className="nav-item">
                <div className="logout" onClick={handleLogout}>
                  Logout
                </div>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <CSurfer path="/login" content="Login" />
                </li>
                <li className="nav-item">
                  <CSurfer path="/register" content="Register" />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};