const API = import.meta.env.VITE_API_URL ?? '/api';

export type Fund = {
  id: string;
  name: string;
  category?: string;
};

export async function fetchFunds(): Promise<Fund[]> {
  const res = await fetch(`${API}/funds`);
  if (!res.ok) throw new Error(`Failed to fetch funds: ${res.status}`);
  return res.json();
}

export async function health(): Promise<{status: string}> {
  const res = await fetch(`${API}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
  return res.json();
}

export default { fetchFunds, health };
