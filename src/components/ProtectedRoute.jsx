import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { authToken } = useAuth();
  
  if (!authToken) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;