"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import getCardHolders from '../../lib/getCardHolders';

const CardHolderView: React.FC = () => {
    const [searchedName, setSearchedName] = useState<string>("");
    const [cardHoldersData, setCardHoldersData] = useState<CardHoldersType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // const cardHolders: Promise<CardHoldersType> = getCardHolders()

    // const cardHolderFetched = cardHolders;

    // console.log("cardHodlerFetched: ", cardHolderFetched)

    // console.log("hello")

    useEffect(() => {
        const fetchedCardHolders = getCardHolders();

        console.log("fetchedCardHolders: ", fetchedCardHolders)
    }, [])

    useEffect(() => {
        const fetchCardHolders = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/getCardHolders');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCardHoldersData(data);
            } catch (error) {
                console.error("Error from fetchCardHolders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCardHolders();
    }, []);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchedName(event.target.value.toLowerCase());
    };

    const filteredCardHolders = searchedName
        ? Object.values(cardHoldersData).flat().filter((cardHolder) =>
            cardHolder.firstName.toLowerCase().includes(searchedName) ||
            cardHolder.lastName.toLowerCase().includes(searchedName)
        )
        : Object.values(cardHoldersData).flat();

    return (
        <div className="container mx-auto p-4 flex flex-col gap-4 h-screen overflow-y-auto">
            <h2 className="text-center text-2xl font-bold mb-4">Cardholder List</h2>

            <div>
                <label htmlFor="cardholder-search" className="sr-only">
                    Search cardholders:
                </label>
                <input
                    id="cardholder-search"
                    onChange={handleSearch}
                    className="w-64 rounded-md mt-4 h-10 mr-2"
                    type="text"
                    aria-label="Search cardholders by name"
                />
                <button className="bg-blue-500 h-10 w-16 rounded-md">Search</button>
            </div>

            {isLoading && (
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}

            {cardHoldersData instanceof Error && (
                <div className="text-red-500 text-center mt-4">
                    Error fetching cardholders: {cardHoldersData.message}
                </div>
            )}

            {cardHoldersData.length === 0 && !isLoading && (
                <div className="text-gray-500 text-center mt-4">No cardholders found.</div>
            )}

            {filteredCardHolders.length > 0 && !isLoading && (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCardHolders.map((cardHolder) => (
                        <li key={cardHolder.id} className="cardholder-item bg-white rounded-md shadow-md p-4">
                            <p>Card Holder</p>
                            <div className="flex flex-col">
                                <Link
                                    href={`CardHolders/${cardHolder.id}`}
                                    className="text-lg font-medium mb-2 hover:text-blue-500"
                                >
                                    {cardHolder.firstName} {cardHolder.lastName}
                                </Link>
                                <p className="text-gray-600 mb-2">Address: {cardHolder.address}</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-600">Family Count:</p>
                                    <span className="text-blue-500 font-semibold">{cardHolder.familyCount}</span>
                                </div>
                                <p className="text-gray-600">Gender: {cardHolder.gender}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CardHolderView;
