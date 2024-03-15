"use client"

import { FC, useEffect, useState } from 'react';

interface PageProps { }

const Page: FC<PageProps> = ({ }) => {
    const [adminId, setAdminId] = useState("")
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        number: '',
        email: '',
        age: 0,
        gender: '',
        address: '',
        familyCount: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        const getAdmin = async () => {
            try {
                const response = await fetch("/api/getAdmin");

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAdminId(data && data.admins && data.admins.length > 0 ? data.admins[0].id : "");
            } catch (error) {
                console.error("Error from fetchCardHolders:", error);
            } finally {
                setLoading(false);
            }
        }

        getAdmin();
    }, [formData])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        // Here you can handle form submission, e.g., send data to backend API

        setLoading(true)

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: adminId,
                    formData: formData,
                }),
            });

            setLoading(false);

            if (!response.ok) {
                setError((await response.json()).message);
                return;
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
            alert(`error: , ${error}`)
        } finally {
            console.log("formdata: ", formData);
            setFormData({
                firstName: '',
                lastName: '',
                number: '',
                email: '',
                age: 0,
                gender: '',
                address: '',
                familyCount: 0,
            })
        }
    };

    return (
        <div className='mt-48 pt-4 bg-slate-400 w-screen h-screen'>
            <h1>Ration Card Application</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="number">Phone Number:</label>
                    <input type="text" id="number" name="number" value={formData.number} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="familyCount">Family Count:</label>
                    <input type="number" id="familyCount" name="familyCount" value={formData.familyCount} onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Page;
