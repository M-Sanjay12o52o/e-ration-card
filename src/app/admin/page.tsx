"use client"

import AddHubForm from '@/components/AddHubForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

interface Hub {
    name: string;
    address: string;
    superVisorName: string;
    vehicleNumber: string;
    // supervisorContact: string;
}

const page: FC = () => {
    const [selectedHub, setSelectedHub] = useState('');
    const [addHub, setAddHub] = useState<boolean>(false);
    const [hubs, setHubs] = useState<Hub[]>([])
    const [error, setError] = useState<string | null>(null);

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

    const handleHubChange = (value: string) => {
        setSelectedHub(value);
        console.log("value: ", value)
    };


    const selectedHubData = hubs.find((hub) => hub.name === selectedHub);

    return (
        <div className="container mx-auto mt-8 px-4 pt-4">
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
                    <button onClick={() => setAddHub(true)} className='bg-gray-700 w-44 h-10 mt-4 rounded-md'>
                        Add Hub
                    </button>
                )
            }

            <div className='w-64 h-12 bg-slate-600 rounded-md text-center align-middle mt-4 cursor-pointer'>
                <Link href={'/createCardHolder'}>Create Card Holders</Link>
            </div>

            <div className="selected-hub text-center font-bold text-xl mb-4">Selected hub: {selectedHub}</div>

            {selectedHubData && (
                <div className="hub-details bg-gray-100 p-4 rounded shadow-md">
                    <p className="flex items-center justify-between text-gray-700 font-medium mb-2">
                        <span className="w-1/3">Hub Name:</span> {selectedHubData.name}
                    </p>
                    <p className="flex items-center justify-between text-gray-700 font-medium mb-2">
                        <span className="w-1/3">Hub Address:</span> {selectedHubData.address}
                    </p>
                    <p className="flex items-center justify-between text-gray-700 font-medium mb-2">
                        <span className="w-1/3">Hub Vehicle:</span> {selectedHubData.superVisorName}
                    </p>
                    <p className="flex items-center justify-between text-gray-700 font-medium mb-2">
                        <span className="w-1/3">Supervisor name:</span> {selectedHubData.vehicleNumber}
                    </p>
                    {/* <p className="flex items-center justify-between text-gray-700 font-medium">
                        <span className="w-1/3">Supervisor contact:</span> {selectedHubData.supervisorContact}
                    </p> */}
                </div>
            )}
        </div>
    );
};

export default page;
