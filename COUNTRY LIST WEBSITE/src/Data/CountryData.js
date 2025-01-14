export default async function CountryData(apiLink, errorMessage) {
    const request = await fetch(apiLink);
    if (!request.ok) {
        throw new Error(errorMessage);
    }
    else {
        const response = await request.json();
        return response;
    }
}
