export default async function weatherData(apiUrl, error) {
    const request = await fetch(apiUrl);
    if (request.ok) {
        const response = await request.json();
        return response;
    }
    else {
        throw new Error(error);
    }
}