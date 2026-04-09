const rawBase = import.meta.env.VITE_API_URL || '';

export const API_BASE_URL = rawBase.replace(/\/$/, '');

export const apiUrl = (path) => {
  if (!path) return API_BASE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path}`;
};

export const apiFetch = (path, options) => fetch(apiUrl(path), options);
