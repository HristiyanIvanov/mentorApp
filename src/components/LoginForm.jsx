import { useMutation } from "@tanstack/react-query";
import FormContainer from "./FormContainer";
import InputField from "./InputField";
import { useState } from "react";
import { loginUser } from "../services/usersApi";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    id: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const mutation = useMutation({
    mutationFn: (credentials) => 
      loginUser(credentials),
    onSuccess: (data) => {
      const token = data.token; // Assuming the API response includes an auth token
      login(token); // Set token in AuthContext

      // Ensure navigation happens after token state updates
      Promise.resolve().then(() => navigate("/dashboard"));
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(credentials);
  };

  const handleRegister = () => {
    navigate("/register"); // Redirect to the register page
  };
  return (
    <FormContainer title="Login">
      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          name="name"
          type="text"
          value={credentials.name}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <InputField
          label="ID"
          name="id"
          type="text"
          value={credentials.id}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
        />
 <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleRegister}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
