export default async function getCardHolders() {
    const response = await fetch('/api/getCardHolders');

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data;
};
