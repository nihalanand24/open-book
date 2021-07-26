export const titleBaseUrl = "https://openlibrary.org/search.json?title=";
export const openLibraryUrl = "https://openlibrary.org";
export const getCoverImage = (coverID, size) => {
    const coverImageBaseUrl = "http://covers.openlibrary.org/b/id/";
    if (size) {
        return coverImageBaseUrl + `${coverID}-${size.toUpperCase()}.jpg`
    } else return coverImageBaseUrl + `${coverID}.jpg`
}