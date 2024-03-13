"use client"

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    if (status === "authenticated") {
        return <div className='w-screen h-screen mt-48 bg-slate-400'>
            <p>Signed in as {session.user?.role}</p>
        </div>
    }

    return <a href="/api/auth/signin">Sign in</a>

}

export default page
