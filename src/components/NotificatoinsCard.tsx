import { FC } from 'react'

interface NotificatoinsCardProps {
    firstName: string
    lastName: string
    number: string
    email: string
}

const NotificatoinsCard: FC<NotificatoinsCardProps> = ({ firstName, lastName, number, email }) => {
    return <div className='flex flex-row justify-around h-12 bg-slate-300 rounded-md m-4 pt-3'>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{number}</p>
        <p>{email}</p>
    </div>
}

export default NotificatoinsCard