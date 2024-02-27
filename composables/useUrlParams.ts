export default (url?: string) => {
    if (!url) return {};

    const urlSearchParams = new URLSearchParams(new URL(url).search);

    const queryParams: any = {};
    for (const [key, value] of urlSearchParams) {
        queryParams[key] = value;
    }

    return queryParams;
}