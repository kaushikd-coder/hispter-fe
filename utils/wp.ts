// utils/wp.ts
export function pickFeaturedImage(wp: any): string {
    const m = wp._embedded?.["wp:featuredmedia"]?.[0];
    // Prefer a reasonable card/large size if present, fallback to source_url
    const sizes = m?.media_details?.sizes || {};
    return (
        sizes["card"]?.source_url ||
        sizes["large"]?.source_url ||
        sizes["medium_large"]?.source_url ||
        m?.source_url ||
        ""
    );
}

export function pickCategory(wp: any): string {
    // _embedded["wp:term"] is an array of tax arrays; find service_category
    const taxArrays = wp._embedded?.["wp:term"] || [];
    for (const arr of taxArrays) {
        const first = arr?.[0];
        if (first?.taxonomy === "service_category") {
            return first.name || "General";
        }
    }
    return "General";
}




export function pickFeaturedImageFromPost(wp): string {
  const m = wp._embedded?.["wp:featuredmedia"]?.[0];
  const sizes = m?.media_details?.sizes || {};
  return (
    sizes["card"]?.source_url ||
    sizes["large"]?.source_url ||
    sizes["medium_large"]?.source_url ||
    m?.source_url ||
    ""
  );
}
