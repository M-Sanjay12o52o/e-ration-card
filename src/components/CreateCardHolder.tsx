"use client"

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FC, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface CreateCardHolderProps { }

const CreateCardHolder: FC<CreateCardHolderProps> = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        number: "",
        email: "",
        age: 0,
        gender: "",
        address: "",
        familyCount: 0,
    });
    const [familyMemberFormValues, setfamilyMemberFormValues] = useState({
        fullName: "",
        age: 0,
        relation: "",
        number: "",
    })

    console.log("familyMemberFormValues: ", familyMemberFormValues)

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleChangeFamilyMembers = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setfamilyMemberFormValues({ ...familyMemberFormValues, [name]: value });
    };

    const handleAddFamilyMember = async (event: React.FormEvent) => {

        event.preventDefault();

        setLoading(true);
        setfamilyMemberFormValues({
            fullName: "",
            age: 0,
            relation: "",
            number: ""
        })

        try {
            const response = await fetch('/api/addFamilyMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(familyMemberFormValues),
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
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);
        setFormValues({
            firstName: "",
            lastName: "",
            number: "",
            email: "",
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
        <div className="container mx-auto mt-8 px-4 pt-4 h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-slate-700 rounded-md p-8 shadow-md">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className="mb-1 text-white">First Name:</label>
                        <input
                            name="firstName"
                            type="text"
                            value={formValues.firstName}
                            onChange={handleChange}
                            id="firstName"
                            className="rounded-md border-gray-300 p-2 focus:border-blue-500 text-black"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="mb-1 text-white">Last Name:</label>
                        <input
                            name="lastName"
                            type="text"
                            value={formValues.lastName}
                            onChange={handleChange}
                            id="lastName"
                            className="rounded-md border-gray-300 p-2 focus:border-blue-500 text-black"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="number" className="mb-1 text-white">Number:</label>
                        <input
                            name="number"
                            type="text"
                            value={formValues.number}
                            onChange={handleChange}
                            id="number"
                            className="rounded-md border-gray-300 p-2 focus:border-blue-500 text-black"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-white">Email:</label>
                        <input
                            name="email"
                            type="text"
                            value={formValues.email}
                            onChange={handleChange}
                            id="email"
                            className="rounded-md border-gray-300 p-2 focus:border-blue-500 text-black"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="age" className="mb-1 text-white">Age:</label>
                        <input
                            name="age"
                            type="number"
                            value={formValues.age}
                            onChange={handleChange}
                            id="age"
                            className="rounded-md border-gray-300 p-2 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="gender" className="mb-1 text-white">Gender:</label>
                        <input
                            name="gender"
                            type="text"
                            value={formValues.gender}
                            onChange={handleChange}
                            id="gender"
                            className="rounded-md border-gray-300 p-2 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="address" className="mb-1 text-white">Address:</label>
                        <textarea
                            name="address"
                            value={formValues.address}
                            onChange={handleChange}
                            id="address"
                            className="rounded-md border-gray-300 p-2 h-20 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="familyCount" className="mb-1 text-white">Family Count:</label>
                        <input
                            name="familyCount"
                            type="number"
                            value={formValues.familyCount}
                            onChange={handleChange}
                            id="familyCount"
                            className="rounded-md border-gray-300 p-2 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Dialog>
                            <DialogTrigger
                                className='h-12 w-full bg-blue-700 rounded-md'>
                                Add Family Members
                            </DialogTrigger>
                            <DialogContent>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Family Member</CardTitle>
                                        <CardDescription>Family Members form</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form action="">
                                            <label htmlFor="familyMember-fullName">Full Name:</label>
                                            <input
                                                type="text"
                                                id="familyMember-fullName"
                                                name="fullName"
                                                value={familyMemberFormValues.fullName}
                                                onChange={handleChangeFamilyMembers}
                                                className="rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 text-black mb-4"
                                            />
                                            <br />
                                            <label htmlFor="familyMember-age">Age:</label>
                                            <input
                                                type="number"
                                                id="familyMember-age"
                                                name="age"
                                                value={familyMemberFormValues.age}
                                                onChange={handleChangeFamilyMembers}
                                                className="rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 text-black mb-4"
                                            />
                                            <br />
                                            <label htmlFor="familyMember-relation">Relation:</label>
                                            <input
                                                type="text"
                                                id="familyMember-relation"
                                                name="relation"
                                                value={familyMemberFormValues.relation}
                                                onChange={handleChangeFamilyMembers}
                                                className="rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 text-black mb-4"
                                            />
                                            <br />
                                            <label htmlFor="familyMember-relation">Number:</label>
                                            <input
                                                type="text"
                                                id="familyMember-relation"
                                                name="number"
                                                value={familyMemberFormValues.number}
                                                onChange={handleChangeFamilyMembers}
                                                className="rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 text-black mb-4"
                                            />
                                            <button
                                                onClick={handleAddFamilyMember}
                                                className='bg-blue-500 rounded-md h-12 w-full' type="button">
                                                Add Family Member
                                            </button>
                                        </form>
                                    </CardContent>
                                    <CardFooter>
                                        {/* <p>Card Footer</p> */}
                                    </CardFooter>
                                </Card>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
                    Submit
                </button>
            </form>
        </div>


    );
};

export default CreateCardHolder;
