export const WP_URL = import.meta.env.VITE_WP_URL || "https://service-manager.local";
const API = `${WP_URL.replace(/\/$/, "")}/wp-json/wp/v2`;


export type WPMedia = {
    source_url: string;
    media_details?: { sizes?: Record<string, { source_url: string }> };
};

export type WPBase = {
    id: number;
    slug: string;
    title: { rendered: string };
    excerpt?: { rendered: string };
    content?: { rendered: string };
    _embedded?: {
        "wp:featuredmedia"?: (WPMedia & { media_details?: any })[];
        "wp:term"?: any[];
    };
};

export type WPService = WPBase & {
    meta?: { price?: string };
};


// Helper: get a nice image URL from _embed
export function getFeatured(src?: WPMedia | undefined) {
    const size1 = src?.media_details?.sizes?.["medium"] as WPMedia | undefined;
    const size2 = src?.media_details?.sizes?.["large"] as WPMedia | undefined;
    return size1?.source_url || size2?.source_url || src?.source_url || "";
}


// Fetch services from WP
export async function fetchServices(params: Record<string, string | number> = {}) {
    const qs = new URLSearchParams({
        per_page: "100",
        _embed: "1",
        ...Object.fromEntries(
            Object.entries(params).map(([k, v]) => [k, String(v)])
        ),
    });
    const res = await fetch(`${API}/service?${qs.toString()}`);
    if (!res.ok) throw new Error(`WP service (${res.status})`);
    const data = (await res.json()) as WPService[];
    const total = Number(res.headers.get("X-WP-Total") || "0");
    return { data, total };
}

// Fetch post from WP
export async function fetchPosts(params: Record<string, string | number> = {}) {
    const qs = new URLSearchParams({
        per_page: "6",
        _embed: "1",
        ...Object.fromEntries(
            Object.entries(params).map(([k, v]) => [k, String(v)])
        ),
    });
    const res = await fetch(`${API}/posts?${qs.toString()}`);
    if (!res.ok) throw new Error(`WP posts (${res.status})`);
    const data = (await res.json()) as WPBase[];
    const total = Number(res.headers.get("X-WP-Total") || "0");
    return { data, total };
}