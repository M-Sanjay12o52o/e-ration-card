"use client"

import { Card } from '@/components/ui/card';
import { X, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobNumber, setMobNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useRouter();

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            // Client-side validation
            if (password !== confirmPassword) {
                alert('Password do not match');
                return;
            }

            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                // Handle successful sign-up
                alert('User signed up successfully');
                // Optionally, clear the form or redirect to a different page
            } else {
                // Handle sign-up error
                alert('Failed to sign up');
                const errorData = await response.json(); // Parse error response for more specific details
                console.error('Sign-up error:', errorData);
            }
        } catch (error) {
            alert(`Error during sign-up: ${error}`);
            console.error('Sign-up error:', error);
        }
    };

    return (
        <div className='container mx-auto pt-24'>
            <div className='text-center mb-4'>
                <h1 className='font-serif text-4xl text-black text-center mb-4 underline'>User Registration.</h1>
                <p className='text-md text-black text-center font-semibold'>Welcome you all</p>
            </div>
            <Card className="w-full max-w-md mx-auto shadow-md rounded-lg bg-gradient-to-br from-white to-gray-100 p-4">
                <Link href={'/'}>
                    <XCircle className='cursor-pointer' />
                </Link>
                <form onSubmit={handleSignUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <br />
                    Username - <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    Email - <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    Number - <input type="tel" value={mobNumber} onChange={(e) => setMobNumber(e.target.value)} placeholder="Mobile Number" />
                    Password - <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    Confirm Password - <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                    <button className='bg-blue-600 rounded-md ml-12 h-10 w-80' type="submit">Sign Up</button>
                </form>
            </Card>
        </div>
    );
};

export default SignUpForm;
