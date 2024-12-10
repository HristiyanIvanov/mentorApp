export const fetchAuthStatus = async () => {
  const response = await fetch('http://93.123.16.182/mentorship/check_auth.php');
  if (!response.ok) {
    throw new Error('Failed to fetch authentication status');
  }
  return response.json();
};
