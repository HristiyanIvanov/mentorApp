export const deactivateAccounts = async () => {
  const response = await fetch('http://93.123.16.182/mentorship/deactivate_account.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to deactivate accounts');
  }
  return response.json();
};
