// api/services.ts
const API_URL = import.meta.env.VITE_WP_URL;
export async function fetchServices() {
    const res = await fetch(`${API_URL}/service?_embed=1&per_page=100`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json;
}