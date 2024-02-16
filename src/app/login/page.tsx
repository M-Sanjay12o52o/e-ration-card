"use client"

import { FC } from 'react';
import { Card } from '@/components/ui/card';
import { X, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface pageProps { }

const LoginPage: FC<pageProps> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useRouter();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Implement your login logic here
        // ...

        try {
            // ... handle login response
        } catch (error) {
            // ... handle login error
        }
    };

    return (
        <div className="container mx-auto pt-24">
            <div className="text-center mb-4">
                <h1 className="font-serif text-4xl text-black text-center mb-4">
                    Welcome Back!
                </h1>
                <p className="text-md text-black text-center font-semibold">
                    Log in to your account
                </p>
            </div>
            <Card className="w-full max-w-md mx-auto shadow-md rounded-lg bg-white">
                <Link href="/">
                    <XCircle className="cursor-pointer" />
                </Link>
                <form onSubmit={handleLogin} className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                    <br />
                    Username - <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    Password - <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button className="bg-blue-600 rounded-md ml-12 h-10 w-80" type="submit">
                        Log In
                    </button>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
