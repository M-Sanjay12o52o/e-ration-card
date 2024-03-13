"use client"

import { FC, useEffect, useState } from 'react';
import { RationTest } from '../../data/data';

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    const selectedProducts = RationTest
    const [ration, setRation] = useState<Product[] | undefined>([])

    useEffect(() => {
        const getRation = async () => {
            try {
                const response = await fetch("/api/getRation");

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
    }, [])

    return (
        <div className='mt-56'>
            <h1 className='w-full bg-blue-400 h-12 text-center pt-2 text-xl'>Available Ration</h1>
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
                    {selectedProducts.map((product) => (
                        <tr key={product.id} style={{ borderBottom: '1px solid black' }}>
                            <td className='text-center' style={{ border: '1px solid black', padding: '5px' }}>
                                {product.id}
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
        </div>
    );
};

export default page;
