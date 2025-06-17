import api from './index';

function setAuth(token, userId) {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
}

function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

function getToken() {
  return localStorage.getItem('token');
}

function getUserId() {
  return localStorage.getItem('userId');
}

export async function loginUser(credentials) {
  const response = await api.post('auth/login', credentials);
  const { token, userId } = response.data;
  await setAuth(token, userId);
  return response.data;
}

export function registerUser(data) {
  return api.post('auth/register', data);
}

export async function fetchPrivateUser() {
  const userId = getUserId();
  const token = getToken();

  if (!userId || !token) {
    throw new Error('UserId ou token não encontrado');
  }

  console.log('Fetching private user with ID:', userId);

  return api.get(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function logoutUser() {
  console.log('Logging out user');
  clearAuth();
}

export async function updateUserProfile(data) {
  const userId = getUserId();
  const token = getToken();

  if (!userId || !token) {
    throw new Error('UserId ou token não encontrado');
  }

  return api.put(`/user/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateUserPassword(data) {
  const userId = getUserId();
  const token = getToken();

  if (!userId || !token) {
    throw new Error('UserId ou token não encontrado');
  }

  return api.put(`/user/${userId}/password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getToken, getUserId };