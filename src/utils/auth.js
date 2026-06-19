export const logoutAdmin = () => {
  localStorage.removeItem('bengkelpro_user');
  localStorage.removeItem('bengkelpro_user_mode');
};
