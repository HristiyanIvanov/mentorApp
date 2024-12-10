import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function NavBar() {
  const { authToken, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from your AuthContext
    navigate("/"); // Redirect the user to the login page
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">MentorApp</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Начало
          </Link>
          {authToken && (
            <Link
              to="/admin"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
            >
              Админ Панел
            </Link>
          )}
        </div>
        <div className="flex items-center gap-4">
          {authToken ? (
            <>
              <button
                onClick={() => navigate(`/profile`)}
                className="block px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
