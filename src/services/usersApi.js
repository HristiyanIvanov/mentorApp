const registerUser = async (userData) => {
  const response = await fetch('http://93.123.16.182/mentorship/register.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
};

const loginUser = async (credentials) => {
  const response = await fetch('http://93.123.16.182/mentorship/login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};

const fetchUsers = async () => {
  const response = await fetch('http://93.123.16.182/mentorship/get_users.php');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}
const fetchUser = async (id) => {
  const response = await fetch(`http://93.123.16.182/mentorship/get_user.php?id=${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export { registerUser, loginUser, fetchUsers, fetchUser };