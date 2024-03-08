"use client";

import axios, { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';

const CardHolderDetailsPage: React.FC = () => {
    const [cardHolderData, setCardHolderData] = useState<CardHoldersType>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log("cardHolderData: ", cardHolderData)
    console.log("typeof cardHolderData: ", typeof cardHolderData)

    const params = useParams();

    useEffect(() => {
        const fetchCardHolder = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/getCardHolder?cardHolderId=${params.cardHolderId}`);
                setCardHolderData(response.data.cardHolder);
            } catch (error: any) {
                console.error("Error from fetchCardHolder:", error);
                setError(error.message || 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCardHolder();
    }, [params.cardHolderId]);

    if (isLoading) return <p className="pt-36">Loading...</p>;
    if (error) return <p className="pt-36">{error}</p>;
    if (!cardHolderData) return <p className="pt-36">No data found</p>;

    return (
        <div className="pt-32">
            <p className="text-black font-medium">data found</p>
            <p className="text-black font-medium">{cardHolderData.firstName}</p>
        </div>
    );
};

export default CardHolderDetailsPage;
