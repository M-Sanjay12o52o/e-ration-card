"use client"

import { useSession } from 'next-auth/react'
import { redirect, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import React, { useState, useEffect, FC } from "react";
import axios, { AxiosError } from "axios";
import Link from 'next/link';

interface PageProps {

}

const DummyData = [
    { date: "10/3/2024", status: "received" },
    { date: "10/2/2024", status: "sent" },
    { date: "10/1/2024", status: "sent" },
    { date: "10/12/2023", status: "received" },
    { date: "10/11/2023", status: "received" },
    { date: "10/10/2023", status: "received" },
    { date: "10/9/2023", status: "received" },
    { date: "10/8/2023", status: "received" },
    { date: "10/7/2023", status: "received" },
    { date: "10/6/2023", status: "received" },
    { date: "10/5/2023", status: "received" },
    { date: "10/4/2023", status: "received" },
    { date: "10/3/2023", status: "received" },
    { date: "10/2/2023", status: "received" },
    { date: "10/1/2023", status: "received" }
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

    const userEmail = session?.user.email

    const role = session?.user.role

    console.log("role: ", role)

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
    if (error && role === 'USER') return <p className="pt-36">
        {/* {error} */}
        You don&apos;t have RATION CARD.
        <Link href="/apply">Click here to apply</Link>
    </p>;
    if (!cardHolderData && role === 'USER') return <p className="pt-36">No data found</p>;

    if (status === "authenticated") {
        return (
            <div className='w-screen h-screen container bg-slate-400 pt-36'>
                <p className='w-full text-2xl text-center font-semibold'>Signed in as {session.user?.role}</p>
                <br />
                <br />

                <div>Role: {role}</div>

                {role === "USER" && (
                    <div className='flex flex-row justify-between px-32'>
                        <div className=''>
                            <Card className="p-4">
                                <CardHeader className="text-black">Card Holder</CardHeader>
                                <CardDescription className="text-black">Card Holder Details</CardDescription>
                                <br />
                                <CardContent>
                                    <ul className="list-none pl-4">
                                        <li>
                                            <span className="font-medium">ID:</span> {cardHolderData && cardHolderData.id}
                                        </li>
                                        <li>
                                            <span className="font-medium">Name:</span> {cardHolderData && cardHolderData.firstName} {cardHolderData && cardHolderData.lastName}
                                        </li>
                                        <li>
                                            <span className="font-medium">Contact:</span>
                                            <ul className="list-disc pl-2">
                                                <li>Phone: {cardHolderData && cardHolderData.number}</li>
                                                <li>Email: {cardHolderData && cardHolderData.email}</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <span className="font-medium">Age:</span> {cardHolderData && cardHolderData.age}
                                        </li>
                                        <li>
                                            <span className="font-medium">Gender:</span> {cardHolderData && cardHolderData.gender}
                                        </li>
                                        <li>
                                            <span className="font-medium">Address:</span> {cardHolderData && cardHolderData.address}
                                        </li>
                                        <li>
                                            <span className="font-medium">Family Count:</span> {cardHolderData && cardHolderData.familyCount}
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <h1 className='w-full text-center text-2xl font-bold'>History</h1>

                            <div className='overflow-auto h-96 bg-blue-300'>
                                {DummyData.map((data, index) => (
                                    <div key={index} className="container flex flex-row justify-between bg-gray-500 rounded-md w-96 p-4 mb-4">
                                        <div>{data.date}</div>
                                        <div>{data.status}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {role === "ADMIN" && (
                    <div className='w-screen h-screen container bg-slate-400'>
                        <p>Admin page</p>
                    </div>
                )}

                {role === "SUBADMIN" && (
                    <div className='w-screen h-screen container bg-slate-400'>
                        <Link href={'/subadmin'}>Link to: <span className='underline'>Sub admin page</span></Link>
                    </div>
                )}
            </div>
        )
    }

    return <a href="/api/auth/signin">Sign in</a>

}

export default Page
