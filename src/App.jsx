import Layout from "./AppLayout";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { AuthProvider, useAuth } from "./components/AuthContext";

const App = () => {
  const { authToken } = useAuth();

  return (
    <Routes>
      {!authToken ? (
        // Public routes for unauthenticated users
        <>
          <Route index element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        // Private routes for authenticated users
        <>
          <Route path="/dashboard" element={<Layout />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
