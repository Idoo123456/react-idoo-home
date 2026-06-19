const adminDefaults = {
  name: 'Admin Bengkel',
  email: 'admin@bengkelpro.test',
  branch: 'Cabang Jakarta',
};

const memberDefaults = {
  name: 'Budi Santoso',
  email: 'budi.santoso@email.com',
};

const parseStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  return parseStorage('bengkelpro_user');
};

export const getStoredRole = (fallback = 'member') => {
  const user = getStoredUser();
  const storedMode = typeof window !== 'undefined' ? localStorage.getItem('bengkelpro_user_mode') : '';
  const role = user?.role || storedMode || fallback;
  return role === 'admin' ? 'admin' : 'member';
};

export const getAdminProfile = () => {
  if (typeof window === 'undefined') return adminDefaults;

  const savedProfile = parseStorage('bengkelpro_admin_profile') || {};
  const user = getStoredUser();
  const userProfile = user ? { name: user.name, email: user.email } : {};

  return { ...adminDefaults, ...savedProfile, ...userProfile };
};

export const getMemberAccountProfile = () => {
  if (typeof window === 'undefined') return memberDefaults;

  const savedProfile = parseStorage('bengkelpro_member_profile') || {};
  const user = getStoredUser();
  const userProfile = user ? { name: user.name, email: user.email } : {};

  return { ...memberDefaults, ...savedProfile, ...userProfile };
};

export const syncProfileFromUser = (user, role) => {
  if (typeof window === 'undefined' || !user) return;

  const profileKey = role === 'admin' ? 'bengkelpro_admin_profile' : 'bengkelpro_member_profile';
  const defaults = role === 'admin' ? adminDefaults : memberDefaults;
  const savedProfile = parseStorage(profileKey) || {};
  const updatedProfile = {
    ...defaults,
    ...savedProfile,
    name: user.name,
    email: user.email,
  };

  localStorage.setItem(profileKey, JSON.stringify(updatedProfile));
  window.dispatchEvent(
    new CustomEvent('bengkelpro-profile-updated', {
      detail: updatedProfile,
    })
  );
};
