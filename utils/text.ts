// utils/text.ts
export function toPlainText(html: string): string {
    // robust in browser environments
    if (typeof window !== "undefined") {
        const div = document.createElement("div");
        div.innerHTML = html;
        return (div.textContent || div.innerText || "").trim();
    }
    // fallback (SSR): light strip
    return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
