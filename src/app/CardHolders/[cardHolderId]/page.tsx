"use client"

import React, { useState, useEffect } from 'react';
import { cardHolders } from '../../../data/cardHolders'; // Or fetch data dynamically
import { useRouter } from 'next/router';


const CardHolderDetailsPage: React.FC<{ params: { cardHolderId: string } }> = ({ params }) => {
    const [selectedCardHolder, setSelectedCardHolder] = useState<CardHoldersType | null>(null);

    useEffect(() => {
        const findCardHolder = (id: string) => cardHolders.find((card) => card.id === id);
        const cardHolder = findCardHolder(params.cardHolderId); // Access cardHolderId from query
        setSelectedCardHolder(cardHolder!);

    }, []);

    if (!selectedCardHolder) {
        return <div>Cardholder not found.</div>;
    }

    return (
        <div className="cardholder-details-container">
            {/* Cardholder details and styling here */}
            <h1 className="cardholder-name">{selectedCardHolder.firstName} {selectedCardHolder.lastName}</h1>
            <p className="cardholder-address">Address: {selectedCardHolder.address}</p>
        </div>
    );
};

export default CardHolderDetailsPage;
