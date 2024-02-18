"use client"

import AddHubForm from '@/components/AddHubForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { ChangeEvent, FC, useState } from 'react';

interface Hub {
    name: string;
    address: string;
    numberOfEmps: number;
    supervisorName: string;
    supervisorContact: string;
}

const dummyHubData: Hub[] = [
    {
        name: "hongasandra",
        address: "123 Hongasandra St.",
        numberOfEmps: 50,
        supervisorName: "John Doe",
        supervisorContact: "9797989778"
    },
    {
        name: "jayanagara",
        address: "456 Jayanagara Ave.",
        numberOfEmps: 40,
        supervisorName: "Jane Smith",
        supervisorContact: "9797989778"
    },
    {
        name: "indiranagara",
        address: "789 Indiranagara Rd.",
        numberOfEmps: 30,
        supervisorName: "Mike Johnson",
        supervisorContact: "9797989778"
    },
    {
        name: "koramangala",
        address: "101 Koramangala Blvd.",
        numberOfEmps: 45,
        supervisorName: "Emily Brown",
        supervisorContact: "9797989778"
    },
    {
        name: "hsr layout",
        address: "234 HSR Layout Ln.",
        numberOfEmps: 35,
        supervisorName: "David Wilson",
        supervisorContact: "9797989778"
    },
    {
        name: "BTM layout",
        address: "567 BTM Layout Rd.",
        numberOfEmps: 55,
        supervisorName: "Sarah Miller",
        supervisorContact: "9797989778"
    }];

const hubs = dummyHubData.map((hub) => hub.name); // Extract hub names

const page: FC = () => {
    const [selectedHub, setSelectedHub] = useState('');
    const [addHub, setAddHub] = useState<boolean>(false);

    const handleHubChange = (value: string) => {
        setSelectedHub(value);
        console.log("value: ", value)
    };

    const selectedHubData = dummyHubData.find((hub) => hub.name === selectedHub);

    return (
        <div className="container mx-auto mt-8 px-4 pt-4">
            <Select onValueChange={handleHubChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a hub" />
                </SelectTrigger>
                <SelectContent>
                    {hubs.map((hub, index) => (
                        <SelectItem value={hub} key={index}>{hub}</SelectItem>
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

            {/* TODO: Searching ration card using id */}
            <div>
                <input className='w-64 rounded-md mt-4 h-10 mr-2' type="text" />
                <button className='bg-blue-500 h-10 w-16 rounded-md'>Search</button>
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
                        <span className="w-1/3">Number of Emps:</span> {selectedHubData.numberOfEmps}
                    </p>
                    <p className="flex items-center justify-between text-gray-700 font-medium mb-2">
                        <span className="w-1/3">Supervisor name:</span> {selectedHubData.supervisorName}
                    </p>
                    <p className="flex items-center justify-between text-gray-700 font-medium">
                        <span className="w-1/3">Supervisor contact:</span> {selectedHubData.supervisorContact}
                    </p>
                </div>
            )}
        </div>
    );
};

export default page;
