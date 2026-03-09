// const API_BASE_URL = 'https://emotion-suppression-backend.onrender.com';
const API_BASE_URL = 'http://127.0.0.1:8000';

// ── helpers ────────────────────────────────────────────────────────────────────
const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(err.detail || 'Request failed');
  }
  return res.json();
};

// ── Video Analysis ─────────────────────────────────────────────────────────────
/**
 * Upload a video for analysis.
 * @param {File}        videoFile
 * @param {string|null} userEmail  If supplied, result is saved to DB under this email.
 * @param {string|null} fileName   Human-readable filename stored with the result.
 */
export const analyzeVideo = async (videoFile, userEmail = null, fileName = null) => {
  const formData = new FormData();
  formData.append('video', videoFile);
  if (userEmail) formData.append('user_email', userEmail);
  if (fileName)  formData.append('file_name',  fileName);

  const response = await fetch(`${API_BASE_URL}/analyze-video`, {
    method: 'POST',
    body:   formData,
  });
  return handleResponse(response);
};

// ── Health ─────────────────────────────────────────────────────────────────────
export const checkAPIHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/`);
  return response.json();
};

// ── Subject Registration ───────────────────────────────────────────────────────
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register-user`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(userData),
  });
  return handleResponse(response);
};

// ── Authentication ─────────────────────────────────────────────────────────────
export const signupUser = async ({ name, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name, email, password }),
  });
  return handleResponse(response);
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_BASE_URL}/me`, {
    headers: authHeaders(token),
  });
  return handleResponse(response);
};

// ── Results ────────────────────────────────────────────────────────────────────
export const getMyResults = async (token) => {
  const response = await fetch(`${API_BASE_URL}/my-results`, {
    headers: authHeaders(token),
  });
  return handleResponse(response);
};

export const getAllUsers = async (token) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: authHeaders(token),
  });
  return handleResponse(response);
};

export const getUserResults = async (email, token) => {
  const response = await fetch(`${API_BASE_URL}/users/${encodeURIComponent(email)}/results`, {
    headers: authHeaders(token),
  });
  return handleResponse(response);
};
