"use client"

import AddHubForm from '@/components/AddHubForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hub } from '@prisma/client';
import Link from 'next/link';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RationTest } from '@/data/data';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Page: FC = () => {
    const [selectedHub, setSelectedHub] = useState<string | undefined>(undefined);
    const [addHub, setAddHub] = useState<boolean>(false);
    const [hubs, setHubs] = useState<Hub[]>([])
    const [error, setError] = useState<string | null>(null);
    const [ration, setRation] = useState<Product[] | undefined>([])
    const selectedProducts = ration

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    const role = session?.user.role

    useEffect(() => {
        const fetchHubs = async () => {
            try {
                const response = await fetch('/api/getHubs');
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(`API error: ${response.statusText}`);
                }

                const hubsArray = [];

                for (const key in data) {
                    if (Array.isArray(data[key])) {
                        hubsArray.push(...data[key])
                    }
                }

                setHubs(hubsArray as Hub[]);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchHubs();
    }, [])

    useEffect(() => {
        const getRation = async () => {
            try {
                const response = await fetch(`/api/getRation?hubId=${hubId}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch ration");
                }

                const data = await response.json();

                setRation(data.rations);
            } catch (error) {
                console.log("Error fetching rations: ", error);
            }
        }

        getRation();
    }, [selectedHub])

    const handleHubChange = (value: string) => {
        setSelectedHub(value);
    };

    const selectedHubData = hubs.find((hub) => hub.name === selectedHub);
    const hubId = selectedHubData?.id;

    return (
        role === "ADMIN" ? (
            <div className="container mx-auto mt-48 px-4 pt-4">
                <Select onValueChange={handleHubChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a hub" />
                    </SelectTrigger>
                    <SelectContent>
                        {hubs.map((hub, index) => (
                            <SelectItem value={hub.name} key={index}>{hub.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {
                    addHub ? (<>
                        <AddHubForm setAddHub={setAddHub} />
                    </>) : (
                        <button onClick={() => setAddHub(true)} className='bg-gray-600 w-44 h-10 mt-4 rounded-md'>
                            Add Hub
                        </button>
                    )
                }

                <div className='w-64 h-10 text-center pt-2 bg-slate-600 rounded-md mt-4 cursor-pointer'>
                    <Link href={'/assign'}>Assign Ration</Link>
                </div>

                <div className="selected-hub text-center font-bold text-xl mb-4">
                    Selected hub: {selectedHub}
                </div>

                {selectedHubData && (
                    <div className="hub-details bg-gray-100 p-4 rounded shadow-md">
                        <p className="flex items-center justify-between text-gray-700 font-medium mb-2">
                            <span className="w-1/3">Hub Name:</span> {selectedHubData.name}
                        </p>
                        <p className="flex items-center justify-between text-gray-700 font-medium mb-2">
                            <span className="w-1/3">Hub Address:</span> {selectedHubData.address}
                        </p>
                        <p className="flex items-center justify-between text-gray-700 font-medium mb-2">
                            <span className="w-1/3">Hub Vehicle:</span> {selectedHubData.vehicleNumber}
                        </p>
                        <p className="flex items-center justify-between text-gray-700 font-medium mb-2">
                            <span className="w-1/3">Supervisor name:</span> {selectedHubData.superVisorName}
                        </p>
                        {/* <Link href={"/viewRation"} className='w-28 h-8 bg-blue-300 rounded-md '>
                        View Ration
                    </Link> */}

                        <Dialog>
                            <DialogTrigger>View Ration</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <h1>Ration Data: {selectedHub}</h1>
                                    <DialogDescription className='w-full bg-blue-400 h-12 text-center pt-2 text-xl'>
                                        Available Ration
                                    </DialogDescription>
                                </DialogHeader>
                                <table style={{ border: '1px solid black', width: '100%' }}>
                                    <thead style={{ borderBottom: '1px solid black' }}>
                                        <tr>
                                            <th style={{ border: '1px solid black', padding: '5px' }}>
                                                Sl.No
                                            </th>
                                            <th style={{ border: '1px solid black', padding: '5px' }}>
                                                Product
                                            </th>
                                            <th style={{ border: '1px solid black', padding: '5px' }}>
                                                Qty (kgs)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedProducts && selectedProducts.map((product: Product, index: number) => (
                                            <tr key={product.id} style={{ borderBottom: '1px solid black' }}>
                                                <td className='text-center' style={{ border: '1px solid black', padding: '5px' }}>
                                                    {index + 1}
                                                </td>
                                                <td className='text-center' style={{ border: '1px solid black', padding: '5px' }}>
                                                    {product.name}
                                                </td>
                                                <td className='text-center' style={{ border: '1px solid black', padding: '5px' }}>
                                                    {product.quantity}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </DialogContent>
                        </Dialog>
                    </div>
                )
                }
            </div>
        ) : (
            <div className='mt-56'>
                <p>Permission denied: You do not have the required permissions to access this page.</p>
            </div>
        )
    );
};

export default Page;
