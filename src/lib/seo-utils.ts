interface SEOItem {
    title: string;
}

export function generateDynamicDescription(
    items: SEOItem[],
    category: string,
    limit: number = 5
): string {
    if (!items || items.length === 0) {
        return `Latest ${category} updates and notifications from Rajasthan Recruitment.`;
    }

    const latestItems = items.slice(0, limit).map((item) => item.title);
    const itemsString = latestItems.join(", ");

    return `Latest ${category}: ${itemsString}... and more. Check official Rajasthan government job ${category.toLowerCase()} here.`;
}

export function generateDynamicKeywords(
    items: SEOItem[],
    baseKeywords: string[],
    limit: number = 5
): string[] {
    if (!items || items.length === 0) {
        return baseKeywords;
    }

    const itemKeywords = items
        .slice(0, limit)
        .map((item) => item.title)
        .flatMap(title => {
            // Simple extraction: generic terms often used in titles
            return [title, title.replace(/\s\d{4}.*$/, "")];
        });

    // Remove duplicates and combine
    return Array.from(new Set([...baseKeywords, ...itemKeywords]));
}
