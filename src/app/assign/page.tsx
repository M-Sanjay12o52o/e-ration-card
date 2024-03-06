"use client"

import { FC, useEffect, useState } from 'react';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Check } from 'lucide-react';

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    const [selector, setSelector] = useState<boolean>(false)
    const [hubs, setHubs] = useState<Hub[]>([])
    const [error, setError] = useState<string | null>(null);
    const [selectedHubs, setSelectedHubs] = useState<string[]>([])
    const [selecteMultiple, setSelecteMultiple] = useState<boolean>(false)

    console.log("selectedHubs: ", selectedHubs)

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

    // Define data for your products
    const products = [
        { id: 1, name: 'Rice', qty: 10 },
        { id: 2, name: 'Ragi', qty: 5 },
        { id: 3, name: "Sugar", qty: 8 },
        // Add more products here
    ];

    return (
        <div className='w-screen h-screen bg-green-400 mt-28 flex flex-row'>
            <div className='bg-red-700 w-[700px] h-full rounded-md overflow-auto'>
                {/* Ration Table */}
                <div className='bg-yellow-300 text-center'>
                    <h2 className='font-sans text-xl m-4'>Ration Table</h2>
                </div>
                <table style={{ border: '1px solid black', width: '100%' }}>  {/* Table border */}
                    <thead style={{ borderBottom: '1px solid black' }}>  {/* Header row border */}
                        <tr>
                            <th style={{ border: '1px solid black', padding: '5px' }}>  {/* Header cell borders */}
                                Sl.No
                            </th>
                            <th style={{ border: '1px solid black', padding: '5px' }}>  {/* Header cell borders */}
                                Product
                            </th>
                            <th style={{ border: '1px solid black', padding: '5px' }}>  {/* Header cell borders */}
                                Qty (kgs)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} style={{ borderBottom: '1px solid black' }}>  {/* Row border */}
                                <td className='text-center' style={{ border: '1px solid black', padding: '5px' }}>  {/* Cell borders and padding */}
                                    {product.id}
                                </td>
                                <td className='text-center' style={{ border: '1px solid black', padding: '5px' }}>  {/* Cell borders and padding */}
                                    {product.name}
                                </td>
                                <td className='text-center' style={{ border: '1px solid black', padding: '5px' }}>  {/* Cell borders and padding */}
                                    <button className='bg-white w-8 ml-2 mr-2 rounded-md'>-</button>
                                    {product.qty}
                                    <button className='bg-white w-8 ml-2 mr-2 rounded-md'>+</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='bg-yellow-400 w-full'>
                <label htmlFor="selectMultiple">
                    <input
                        onClick={() => setSelecteMultiple(!selecteMultiple)}
                        type="radio"
                        name="selectMultiple"
                        id="selectMultiple"
                    />
                    Select Multiple
                </label>
                <Command className='bg-slate-400 h-60'>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandSeparator />
                        <CommandGroup heading="hubs">
                            {hubs.map((hub) => (
                                <CommandItem
                                    key={hub.id}
                                    className='flex flex-row justify-between'
                                >
                                    <button
                                        onClick={() => setSelectedHubs([hub.name])}
                                        className='w-full text-start'
                                    >
                                        {hub.name}
                                    </button>
                                    {selectedHubs.includes(hub.name) ? <Check /> : null}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </div>
        </div>
    );
};

export default page;