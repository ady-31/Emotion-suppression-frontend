const API_BASE_URL = 'http://localhost:8000';

/**
 * Upload a video file for full emotion-suppression analysis.
 * @param {File} videoFile
 * @returns {Promise<Object>} Analysis result JSON
 */
export const analyzeVideo = async (videoFile) => {
  const formData = new FormData();
  formData.append('video', videoFile);

  const response = await fetch(`${API_BASE_URL}/analyze-video`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Analysis failed' }));
    throw new Error(error.detail || 'Analysis failed');
  }

  return response.json();
};

/**
 * Health-check – returns { status: "API is running" }
 */
export const checkAPIHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/`);
  return response.json();
};

/**
 * Save subject registration data to MongoDB.
 * @param {{ name, email, phone, age?, gender? }} userData
 */
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to save user info' }));
    throw new Error(error.detail || 'Failed to save user info');
  }

  return response.json();
};
