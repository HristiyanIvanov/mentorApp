import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormContainer from "./FormContainer";
import InputField from "./InputField";
import { registerUser } from "../services/usersApi";

const generateId = () => Math.random().toString(36).substr(2, 9).toUpperCase();

const RegisterForm = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    id: generateId(),
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: (formData) => registerUser(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      alert("Registration successful! Please log in.");
    },
    onError: (error) => {
      alert(error.message || "Registration failed.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <FormContainer title="Register">
      <form onSubmit={handleSubmit}>
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Generated ID</label>
          <div className="px-4 py-2 border rounded-lg bg-gray-100">{formData.id}</div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </FormContainer>
  );
};

export default RegisterForm;