import VideoUpload from '../components/VideoUpload';
import UsersTable from '../components/UsersTable';

const AdminPanel = () => {
  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">Admin Panel</h1>

      <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Users Data</h2>
        <UsersTable />
      </section>

      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Upload Video</h2>
        <VideoUpload />
      </section>

    </div>
  );
};

export default AdminPanel;
