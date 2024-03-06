import { FC } from 'react';

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    // Define data for your products
    const products = [
        { id: 1, name: 'Rice', qty: 10 },
        { id: 2, name: 'Ragi', qty: 5 },
        { id: 3, name: "Sugar", qty: 8 },
        // Add more products here
    ];

    return (
        <div className='w-screen h-screen bg-green-400 mt-28 flex flex-row'>
            <div className='bg-red-700 w-96 h-full rounded-md overflow-auto'>
                {/* Ration Table */}
                <h2>Ration Table</h2>
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
                                <td style={{ border: '1px solid black', padding: '5px' }}>  {/* Cell borders and padding */}
                                    {product.id}
                                </td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>  {/* Cell borders and padding */}
                                    {product.name}
                                </td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>  {/* Cell borders and padding */}
                                    {product.qty}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='bg-yellow-700'>
                assign
            </div>
        </div>
    );
};

export default page;
