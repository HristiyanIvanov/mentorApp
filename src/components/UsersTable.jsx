import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/usersApi';

const UsersTable = () => {
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Registration Date</th>
          <th>Expiration Date</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.created_at}</td>
            <td>{user.expiration_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
