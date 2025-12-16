export const fetchBooks = async (isbn: string) => {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const json = await res.json();
        if (json.totalItems > 0 && json.items) {
        const info = json.items[0].volumeInfo;
        return {
            isbn,
            title: info.title,
            authors: info.authors ? info.authors.join(', ') : "Unknown",
            coverUrl: info.imageLinks?.thumbnail?.replace('http://', 'https://') || "",
            source: 'Google Books',
            pages: typeof info.pageCount === 'number' ? info.pageCount : 0,
        };
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) { console.log("Google API failed"); }
    return null;
};