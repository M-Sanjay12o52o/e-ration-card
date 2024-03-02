"use client"

import { FC, useEffect, useState } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    const [searchedName, setSearchedName] = useState<string>("");
    const [cardHoldersData, setCardHoldersData] = useState<CardHoldersType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCardHolders = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/getCardHolders');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCardHoldersData(data);
            } catch (error) {
                console.error("Error from fetchCardHolders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCardHolders();
    }, []);

    return (
        <div className='h-screen w-screen bg-slate-400'>
            hello
        </div>
    )
}

export default page