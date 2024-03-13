"use client"

import NotificatoinsCard from '@/components/NotificatoinsCard';
import { FC, useEffect, useState } from 'react'

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {
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
                setCardHoldersData(data.res.flatMap((cardHolder: CardHoldersType) => cardHolder));
            } catch (error) {
                console.error("Error from fetchCardHolders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCardHolders();
    }, []);

    cardHoldersData.flat()

    return (
        <div className='h-screen w-screen bg-slate-400 mt-48'>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                cardHoldersData.map(cardHolder => (
                    <NotificatoinsCard
                        key={cardHolder.id}
                        firstName={cardHolder.firstName}
                        lastName={cardHolder.lastName}
                        number={cardHolder.number}
                        email={cardHolder.email}
                    />
                ))
            )}
        </div>
    )
}

export default Page