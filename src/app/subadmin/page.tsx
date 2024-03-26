"use client"

import NotificatoinsCard from '@/components/NotificatoinsCard';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import { FC, useEffect, useState } from 'react'

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {
    const [searchedName, setSearchedName] = useState<string>("");
    const [cardHoldersData, setCardHoldersData] = useState<CardHoldersType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    console.log("cardHoldersData: ", cardHoldersData)

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    const role = session?.user.role

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
        role === "SUBADMIN" ? (
            <div className='mt-48 w-screen h-screen bg-blue-300'>
                <h1 className='w-full text-center'>Sub admin Page</h1>

                <div className='w-64 h-10 text-center pt-2 bg-slate-600 rounded-md mt-4 cursor-pointer'>
                    <Link href={'/createCardHolder'}>Create Card Holders</Link>
                </div>

                <div className='w-64 h-10 text-center pt-2 bg-slate-600 rounded-md mt-4 cursor-pointer'>
                    <Link href={'/notifications'}>Notifications</Link>
                </div>

                <div className='w-64 h-10 text-center pt-2 bg-slate-600 rounded-md mt-4 cursor-pointer'>
                    <Link href={'/viewRation'}>View Ration</Link>
                </div>

                <div className='flex flex-row justify-around h-20 p-4 w-[1300px] ml-4 m-4'>
                    <button className='w-20 bg-blue-500 rounded-md h-10'>Create</button>
                    {/* ration received main */}
                    <button className='w-20 bg-blue-500 rounded-md h-10'>Send</button>
                    {/* search by ration card number */}
                    <label htmlFor="search">
                        Search
                        <input className='rounded-md ml-2' type="text" />
                    </label>
                </div>
                {/* <div className='w-[1300px] bg-gray-500 rounded-md flex flex-row justify-between h-12 px-4 mx-4'> */}
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
        ) : (
            <div className='mt-56'>
                <p>Permission denied: You do not have the required permissions to access this Page.</p>
            </div>
        )
    )
}

export default Page
