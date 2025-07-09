import { API_BASE_URL } from './config';

export async function apiFetch(
  path: string,
  options?: RequestInit & { fullUrl?: boolean; timeout?: number }
) {
  const url = options?.fullUrl ? path : API_BASE_URL + path;
  const { timeout = 10000, ...fetchOptions } = options || {}; // default timeout: 10s

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { ...fetchOptions, signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      return { status: res.status, ...error };
    }
    return res.json();
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      return { status: 408, message: 'Request timeout' };
    }
    throw error;
  }
}