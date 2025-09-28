import { toPlainText } from "../utils/text";
import { pickFeaturedImageFromPost } from "../utils/wp";


export type Post = {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
};

// Heuristic to keep markdown-like content if present
function pickContent(wp): string {
    // Prefer ACF raw markdown if you store it there
    if (wp.acf?.md_content) return String(wp.acf.md_content).trim();

    const html = wp.content?.rendered || "";
    const text = toPlainText(html);

    // If text appears to contain markdown headings/lists/quotes, keep as-is
    if (/^#{1,6}\s|^\d+\.\s|^-{1}\s|^\*\s|^> /.test(text)) return text.trim();

    // Otherwise just return readable text
    return text.trim();
}

export function mapPost(wp): Post {
    const title = toPlainText(wp.title?.rendered || "");
    const excerpt = toPlainText(wp.excerpt?.rendered || "");
    const content = pickContent(wp);
    const image = pickFeaturedImageFromPost(wp);
    const date = (wp.date || "").slice(0, 10); // YYYY-MM-DD

    return { id: wp.id, title, excerpt, content, image, date };
}
