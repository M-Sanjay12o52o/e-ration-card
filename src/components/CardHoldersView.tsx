"use client"

import React, { ChangeEvent, useState } from 'react';
import { cardHolders } from '../data/cardHolders';
import Link from 'next/link';

const CardHolderView: React.FC = () => {
    const [searchedName, setSearchedName] = useState<string>("")

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchedName(event.target.value.toLowerCase())
    }

    const filteredCardHolders = searchedName ? cardHolders.filter((cardHolder) => {
        const fullName = `${cardHolder.firstName.toLowerCase()} ${cardHolder.lastName.toLowerCase()}`;
        return fullName.includes(searchedName)
    })
        : cardHolders

    return (
        <div className="container mx-auto p-4 flex flex-col gap-4 h-screen overflow-y-auto">
            <h2 className="text-center text-2xl font-bold mb-4">Cardholder List</h2>

            {/* TODO: Searching ration card using id */}
            <div>
                <input onChange={handleSearch} className='w-64 rounded-md mt-4 h-10 mr-2' type="text" />
                <button className='bg-blue-500 h-10 w-16 rounded-md'>Search</button>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCardHolders.map((cardHolder) => (
                    <li key={cardHolder.id} className="cardholder-item bg-white rounded-md shadow-md p-4">
                        <div className="flex flex-col">
                            <Link href={`CardHolders/${cardHolder.id}`} className="text-lg font-medium mb-2">
                                {cardHolder.firstName} {cardHolder.lastName}
                            </Link>
                            <p className="text-gray-600 mb-2">Address: {cardHolder.address}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-gray-600">Family Count:</p>
                                <span className="text-blue-500 font-semibold">{cardHolder.familyCount}</span>
                            </div>
                            <p className="text-gray-600">Gender: {cardHolder.gender}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardHolderView;
