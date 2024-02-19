"use client"

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FC, useState } from 'react';

interface CreateCardHolderProps {
    // Define props here if needed
}

const CreateCardHolder: FC<CreateCardHolderProps> = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        address: "",
        familyCount: 0,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);
        console.log("formvalues: ", formValues)
        setFormValues({
            firstName: "",
            lastName: "",
            age: 0,
            gender: "",
            address: "",
            familyCount: 0,
        })

        try {
            const response = await fetch('/api/createHolder', {
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
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    return (
        <div className="container mx-auto mt-8 px-4 pt-4">
            {/* <h2 className="text-center font-bold mb-4">Create Card Holder</h2> */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 bg-gray-100 rounded-md p-4 shadow-md">
                <div className="flex flex-col w-64">
                    <label htmlFor="firstName" className="mb-2">First Name:</label>
                    <input
                        name="firstName"
                        type="text"
                        value={formValues.firstName}
                        onChange={handleChange}
                        id="firstName"
                        className="rounded-md border-gray-300 p-2 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col w-64">
                    <label htmlFor="lastName" className="mb-2">Last Name:</label>
                    <input
                        name="lastName"
                        type="text"
                        value={formValues.lastName}
                        onChange={handleChange}
                        id="lastName"
                        className="rounded-md border-gray-300 p-2 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col w-64">
                    <label htmlFor="age" className="mb-2">Age:</label>
                    <input
                        name="age"
                        type="number"
                        value={formValues.age}
                        onChange={handleChange}
                        id="age"
                        className="rounded-md border-gray-300 p-2 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col w-64">
                    <label htmlFor="gender" className="mb-2">Gender:</label>
                    <input
                        name="gender"
                        type="text"
                        value={formValues.gender}
                        onChange={handleChange}
                        id="gender"
                        className="rounded-md border-gray-300 p-2 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col w-64">
                    <label htmlFor="address" className="mb-2">Address:</label>
                    <textarea
                        name="address"
                        value={formValues.address}
                        onChange={handleChange}
                        id="address"
                        className="rounded-md border-gray-300 p-2 h-20 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col w-64">
                    <label htmlFor="familyCount" className="mb-2">Family Count:</label>
                    <input
                        name="familyCount"
                        type="number"
                        value={formValues.familyCount}
                        onChange={handleChange}
                        id="familyCount"
                        className="rounded-md border-gray-300 p-2 focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
                    Submit
                </button>
            </form>
        </div>
    );
};


export default CreateCardHolder