const API_URL = "http://localhost:5000/api";

export async function getServices() {
  const response = await fetch(`${API_URL}/services`);
  return await response.json();
}
