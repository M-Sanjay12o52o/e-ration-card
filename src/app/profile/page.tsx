"use client"

import { useSession } from 'next-auth/react'
import { redirect, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import React, { useState, useEffect, FC } from "react";
import axios, { AxiosError } from "axios";

interface PageProps {

}

const DummyData = [
    { date: "1/3/2024", status: "received" },
    { date: "2/3/2024", status: "sent" },
    { date: "3/3/2024", status: "sent" },
];

const Page: FC<PageProps> = ({ }) => {
    const [cardHolderData, setCardHolderData] = useState<CardHoldersType | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    console.log("session.user.email: ", session?.user.email)

    const userEmail = session?.user.email

    const role = session?.user.role

    useEffect(() => {
        const fetchCardHolder = async () => {
            setIsLoading(true);
            if (userEmail !== undefined) {
                try {
                    const response = await axios.get(`/api/cardHolder?userEmail=${userEmail}`);
                    setCardHolderData(response.data.cardHolder);
                } catch (error: any) {
                    console.error("Error from fetchCardHolder:", error);
                    setError(error.message || 'An error occurred');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchCardHolder();
    }, [role]);

    if (isLoading) return <p className="pt-36">Loading...</p>;
    if (error) return <p className="pt-36">{error}</p>;
    if (!cardHolderData) return <p className="pt-36">No data found</p>;

    if (status === "authenticated") {
        return (
            <div className='w-screen h-screen bg-slate-400 flex flex-row justify-between'>
                <p>Signed in as {session.user?.role}</p>

                {role === "USER" && (
                    <>
                        <div className=''>
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

                        <div>
                            <h1 className='w-full text-center'>History</h1>

                            <div className='overflow-auto'>
                                {DummyData.map((data, index) => (
                                    <div key={index} className="container flex flex-row justify-between bg-gray-500 rounded-md w-96 p-4 mb-4">
                                        <div>{data.date}</div>
                                        <div>{data.status}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div >
        )
    }

    return <a href="/api/auth/signin">Sign in</a>

}

export default Page
