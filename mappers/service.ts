// mappers/service.ts

import { toPlainText } from "../utils/text";
import { pickFeaturedImage, pickCategory } from "../utils/wp";

export function mapService(wp) {

    console.log("Mapping service:", wp);

    const title = wp.title?.rendered ? toPlainText(wp.title.rendered) : "";
    const descriptionHtml =
        // prefer excerpt if present, else fall back to content
        wp.excerpt?.rendered?.trim()
            ? wp.excerpt.rendered
            : wp.content?.rendered || "";
    const description = toPlainText(descriptionHtml);

    const image = pickFeaturedImage(wp);
    const category = pickCategory(wp);
    const price = wp.acf?.price || ""

    

    return {
        id: wp.id,
        title,
        description,
        price,
        image,
        category,
    };
}
