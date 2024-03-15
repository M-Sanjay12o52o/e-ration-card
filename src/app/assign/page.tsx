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
import { Ration } from '../../data/data';

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {
    const products = Ration

    const [hubs, setHubs] = useState<Hub[]>([])
    const [error, setError] = useState<string | null>(null);
    const [selecteMultiple, setSelecteMultiple] = useState<boolean>(false)
    const [selectedProducts, setSelectedProducts] = useState<Product[]>(products);
    const [selectedHubId, setSelectedHubId] = useState<string>('');

    console.log("selectedHubId: ", selectedHubId)

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

    const handleQuantityChange = (productId: number, increment: boolean) => {
        setSelectedProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product => {
                if (product.id === productId) {
                    const updatedQty = increment ? product.quantity + 1 : product.quantity - 1;
                    return { ...product, quantity: updatedQty };
                }
                return product;
            });
            return updatedProducts;
        });
    }

    // handling assign
    const handleAssign = async () => {
        const filteredProducts = selectedProducts.filter(
            (product) => product.quantity > 0
        )

        if (filteredProducts.length === 0) {
            console.error('No ration items with a quantity greater than 0 selected');
            return;
        }

        try {
            const response = await fetch('/api/assignRationToHub', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hubId: selectedHubId,
                    rationData: filteredProducts,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to assign ration data to hub');
            }

            setSelectedProducts(products)
        } catch (error: any) {
            console.error('Error assigning ration data to hub:', error.message);
        }
    }

    return (
        <div className='flex flex-row h-screen mt-52'>
            <style jsx>{`
            .container {
              background-color: #f7f7f7; /* Professional background color */
              margin-top: 5rem; /* Adjust margin to go under navigation */
            }
          `}</style>
            {/* Left Panel */}
            <div className='w-3/5 bg-gray-900 text-white'>
                {/* Ration Table */}
                <div className='bg-gray-800 text-yellow-200 text-center'>
                    <h2 className='font-sans text-xl m-4'>Ration Table</h2>
                </div>
                <table className='w-full border-collapse border border-gray-700'>
                    <thead>
                        <tr>
                            <th className='border border-gray-700 px-4 py-2'>Sl.No</th>
                            <th className='border border-gray-700 px-4 py-2'>Product</th>
                            <th className='border border-gray-700 px-4 py-2'>Qty (kgs)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedProducts.map((product) => (
                            <tr key={product.id}>
                                <td className='border border-gray-700 px-4 py-2'>{product.id}</td>
                                <td className='border border-gray-700 px-4 py-2'>{product.name}</td>
                                <td className='border border-gray-700 px-4 py-2 flex justify-center items-center'>
                                    <button
                                        onClick={() => handleQuantityChange(product.id, false)}
                                        className='bg-white w-8 h-8 ml-2 mr-2 rounded-full focus:outline-none text-black'>
                                        -
                                    </button>
                                    {product.quantity}
                                    <button
                                        onClick={() => handleQuantityChange(product.id, true)}
                                        className='bg-white w-8 h-8 ml-2 mr-2 rounded-full focus:outline-none text-black'>
                                        +
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Right Panel */}
            <div className='w-2/5 bg-gray-100'>
                {/* <div className='m-4'>
                    <label htmlFor="selectMultiple" className='text-lg'>
                        <input
                            onClick={() => setSelecteMultiple(!selecteMultiple)}
                            type="checkbox"
                            name="selectMultiple"
                            id="selectMultiple"
                            className='mr-2'
                        />
                        Select Multiple
                    </label>
                </div> */}
                <div className='m-4'>
                    <Command className='bg-white shadow-md rounded-md p-4'>
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandSeparator />
                            <CommandGroup heading="Hubs">
                                {hubs.map((hub) => (
                                    <CommandItem
                                        key={hub.id}
                                        className='flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200 rounded-md'
                                    >
                                        <span
                                            onClick={() => setSelectedHubId(hub.id)}
                                            className='w-full'
                                        >
                                            {hub.name}
                                        </span>
                                        {selectedHubId === hub.id && <Check />}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
                <div className='m-4'>
                    <button onClick={handleAssign} className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'>
                        Assign
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
