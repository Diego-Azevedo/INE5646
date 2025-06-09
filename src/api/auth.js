import api from './index';

export function login(data) {
  return api.post('auth/login', data);
}

export function register(data) {
  return api.post('auth/register', data);
}
