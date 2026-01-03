// Central API client - Frontend never uses fetch directly again
// Simple, safe, with error handling

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export async function apiGet<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`);

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`API request failed: ${path}`, error);
    throw error;
  }
}

