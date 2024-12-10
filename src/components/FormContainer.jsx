const FormContainer = ({ children, title }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">{title}</h2>
      {children}
    </div>
  </div>
);

export default FormContainer;