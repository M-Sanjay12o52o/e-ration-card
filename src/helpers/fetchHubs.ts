export const fetchHubs = async () => {
    const response = await fetch('/api/getHubs');
    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
}