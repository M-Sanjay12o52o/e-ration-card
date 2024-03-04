"use client"

import axios from 'axios'
import { FC, useState } from 'react'

interface NotificatoinsCardProps {
    firstName: string
    lastName: string
    number: string
    email: string
}

const NotificatoinsCard: FC<NotificatoinsCardProps> = ({ firstName, lastName, number, email }) => {
    const [sent, setSent] = useState<boolean>(false)
    const [data, setData] = useState({
        firstName: firstName,
        lastName: lastName,
        email: email,
    })

    const sendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // send request to api/send
        e.preventDefault();
        const response = await fetch('api/send', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data)
        })

        if (response.status === 200) {
            setSent(true);
            console.log('sent')
        }
    }

    return <div className='flex flex-row justify-around h-12 bg-slate-300 rounded-md m-4 pt-3'>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{number}</p>
        <p>{email}</p>
        <button onClick={sendEmail}>
            {sent ? (<p>sent</p>) : ("send")}
        </button>
    </div>
}

export default NotificatoinsCard