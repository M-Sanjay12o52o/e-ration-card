"use client"

import { ChangeEvent, FC } from 'react';
import { Card } from '@/components/ui/card';
import { X, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

interface pageProps { }

const LoginPage: FC<pageProps> = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string>("")

    // const searchParams = useSearchParams();
    // const callbackUrl = searchParams.get("callbackUrl") || "/profile";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setFormValues({ email: "", password: "" });

            const res = await signIn("credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                // callbackUrl,
            });

            setLoading(false);

            if (!res?.error) {
                // router.push(callbackUrl);
            } else {
                setError("invalid email or password");
            }

            setSuccess("Logged in Successfully.")
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    }

    return (
        <div className="container mx-auto mt-48 pt-4">
            <p className='text-2xl'>{success}</p>
            <div className="text-center mb-4">
                <h1 className="font-serif text-4xl text-black text-center mb-4">
                    Welcome Back!
                </h1>
                <p className="text-md text-black text-center font-semibold">
                    Log in to your account
                </p>
            </div>
            <Card className="w-full max-w-md mx-auto shadow-md rounded-lg bg-white h-64">
                <Link href="/">
                    <XCircle className="cursor-pointer" />
                </Link>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                    {error && (
                        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
                    )}
                    <br />
                    Email - <input type="email" name='email' value={formValues.email} onChange={handleChange} placeholder="E-mail" />
                    Password - <input type="password" name='password' value={formValues.password} onChange={handleChange} placeholder="Password" />
                    <button className="bg-blue-600 rounded-md ml-12 h-10 w-80" type="submit" disabled={loading}>
                        {loading ? "loading..." : "Log In"}
                    </button>
                </form>
                <p className='pl-20'>
                    Login as Admin?{"  "}
                    <Link className='underline' href={"/adminLogin"}>Admin Login</Link> page
                </p>
            </Card>
        </div>
    );
};

export default LoginPage;
