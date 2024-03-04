"use client"

import { Card } from '@/components/ui/card';
import { X, XCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const SignUpForm = () => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        mobNumber: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useRouter();

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        setLoading(true);
        setFormValues({ username: "", email: "", password: "", mobNumber: "" });

        try {
            // Client-side validation
            if (formValues.password !== confirmPassword) {
                alert('Password do not match');
                return;
            }

            const response = await fetch('/api/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            setLoading(false);

            if (!response.ok) {
                setError((await response.json()).message);
                return;
            }

            signIn(undefined, { callbackUrl: "/" });

        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
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
                    {error && (
                        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
                    )}
                    <br />
                    Username - <input name='username' type="text" value={formValues.username} onChange={handleChange} placeholder="Username" />
                    Email - <input name='email' type="email" value={formValues.email} onChange={handleChange} placeholder="Email" />
                    Number - <input name='mobNumber' type="tel" value={formValues.mobNumber} onChange={handleChange} placeholder="Mobile Number" />
                    Password - <input name='password' type="password" value={formValues.password} onChange={handleChange} placeholder="Password" />
                    Confirm Password - <input name='password' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                    <button className='bg-blue-600 rounded-md ml-12 h-10 w-80' type="submit" disabled={loading}>
                        Sign Up
                    </button>
                </form>
            </Card>
        </div>
    );
};

export default SignUpForm;
