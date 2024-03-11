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
import { Ration, RationTest } from '../../data/data';

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    const products = RationTest

    const [hubs, setHubs] = useState<Hub[]>([])
    const [error, setError] = useState<string | null>(null);
    const [selectedHubs, setSelectedHubs] = useState<string[]>([])
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
        console.log("productId: ", productId, "increment: ", increment)

        setSelectedProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product => {
                if (product.id === productId) {
                    const updatedQty = increment ? product.qty + 1 : product.qty - 1;
                    return { ...product, qty: updatedQty };
                }
                return product;
            });
            return updatedProducts;
        });
    }

    // handling assign
    const handleAssign = async () => {
        console.log("hello from handle assign")

        console.log("Selected products:", selectedProducts);

        try {
            const response = await fetch('/api/assignRationToHub', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hubId: selectedHubId,
                    rationData: selectedProducts, // Assuming selectedProducts contains the ration data
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to assign ration data to hub');
            }

            // Handle success
            console.log('Ration data assigned to hub successfully');
        } catch (error: any) {
            console.error('Error assigning ration data to hub:', error.message);
        }
    }

    return (
        <div className='mt-56'>
            <h1 className='w-full bg-blue-400 h-12 text-center pt-2 text-xl'>Available Ration</h1>
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
                    {/* {products.map((product) => ( */}
                    {selectedProducts.map((product) => (
                        <tr key={product.id} style={{ borderBottom: '1px solid black' }}>  {/* Row border */}
                            <td className='text-center' style={{ border: '1px solid black', padding: '5px' }}>  {/* Cell borders and padding */}
                                {product.id}
                            </td>
                            <td className='text-center' style={{ border: '1px solid black', padding: '5px' }}>  {/* Cell borders and padding */}
                                {product.name}
                            </td>
                            <td className='text-center' style={{ border: '1px solid black', padding: '5px' }}>  {/* Cell borders and padding */}
                                {/* <button onClick={() => handleQuantityChange(product.id, false)} className='bg-white w-8 ml-2 mr-2 rounded-md'>
                                    -
                                </button> */}
                                {product.qty}
                                {/* <button onClick={() => handleQuantityChange(product.id, true)} className='bg-white w-8 ml-2 mr-2 rounded-md'>
                                    +
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default page;
