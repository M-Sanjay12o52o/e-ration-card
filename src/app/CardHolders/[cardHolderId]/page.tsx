"use client";

import axios, { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

const CardHolderDetailsPage: React.FC = () => {
    const [cardHolderData, setCardHolderData] = useState<CardHoldersType>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
        <div className="pt-48">
            <Card className="p-4">
                <CardHeader className="text-black">Card Holder</CardHeader>
                <CardDescription className="text-black">Card Holder Details</CardDescription>
                <br />
                <CardContent>
                    <ul className="list-none pl-4">
                        <li>
                            <span className="font-medium">ID:</span> {cardHolderData.id}
                        </li>
                        <li>
                            <span className="font-medium">Name:</span> {cardHolderData.firstName} {cardHolderData.lastName}
                        </li>
                        <li>
                            <span className="font-medium">Contact:</span>
                            <ul className="list-disc pl-2">
                                <li>Phone: {cardHolderData.number}</li>
                                <li>Email: {cardHolderData.email}</li>
                            </ul>
                        </li>
                        <li>
                            <span className="font-medium">Age:</span> {cardHolderData.age}
                        </li>
                        <li>
                            <span className="font-medium">Gender:</span> {cardHolderData.gender}
                        </li>
                        <li>
                            <span className="font-medium">Address:</span> {cardHolderData.address}
                        </li>
                        <li>
                            <span className="font-medium">Family Count:</span> {cardHolderData.familyCount}
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default CardHolderDetailsPage;
