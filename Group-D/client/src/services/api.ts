/**
 * API Service for FastAPI + JWT Integration
 */

const BASE_URL = 'http://127.0.0.1:8000';

interface RequestOptions extends RequestInit {
  useAuth?: boolean;
}

export const apiRequest = async (endpoint: string, options: RequestOptions = {}) => {
  const { useAuth = true, ...fetchOptions } = options;

  const headers = new Headers(options.headers || {});
  if (!(fetchOptions.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (useAuth) {
    const token = localStorage.getItem('bb_access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (response.status === 401) {
      // Clear local state if unauthorized
      localStorage.removeItem('bb_access_token');
      localStorage.removeItem('bragboard_user');
      window.location.hash = '#/login';
      throw new Error('Unauthorized Access');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({} as any));
      throw new Error((errorData as any).detail || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Failed [${endpoint}]:`, error);
    throw error;
  }
};
