const API_URL = import.meta.env.VITE_WP_URL;
export async function fetchPosts() {
    const res = await fetch(`${API_URL}/posts?_embed=1&per_page=6`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json ;
}
