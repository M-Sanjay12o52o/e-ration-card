"use client"

import { ChangeEvent, FC, useState } from 'react'

interface FamilyMemberFormProps {

}

const FamilyMemberForm: FC<FamilyMemberFormProps> = ({ }) => {
    const [familyMember, setFamilyMember] = useState({
        firstName: "",
        lastName: "",
        age: 0,
        gender: ""
    });

    const handleFamilyMemberChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFamilyMember({ ...familyMember, [name]: value });
    };


    return <div>
        <div className="flex flex-col w-64">
            <label htmlFor="familyFirstName" className="mb-2">Family Member First Name:</label>
            <input
                name="familyFirstName"
                type="text"
                value={familyMember.firstName}
                onChange={handleFamilyMemberChange}
                id="familyFirstName"
                className="rounded-md border-gray-300 p-2 focus:border-blue-500"
            />
        </div>
        <div className="flex flex-col w-64">
            <label htmlFor="familyLastName" className="mb-2">Family Member Last Name:</label>
            <input
                name="familyLastName"
                type="text"
                value={familyMember.lastName}
                onChange={handleFamilyMemberChange}
                id="familyLastName"
                className="rounded-md border-gray-300 p-2 focus:border-blue-500"
            />
        </div>
        <div className="flex flex-col w-64">
            <label htmlFor="familyAge" className="mb-2">Family Member Age:</label>
            <input
                name="familyAge"
                type="number"
                value={familyMember.age}
                onChange={handleFamilyMemberChange}
                id="familyAge"
                className="rounded-md border-gray-300 p-2 focus:border-blue-500"
            />
        </div>
        <div className="flex flex-col w-64">
            <label htmlFor="familyGender" className="mb-2">Family Member Gender:</label>
            <input
                name="familyGender"
                type="text"
                value={familyMember.gender}
                onChange={handleFamilyMemberChange}
                id="familyGender"
                className="rounded-md border-gray-300 p-2 focus:border-blue-500"
            />
        </div>
        <button
            type="button"
            onClick={() => {
                // Add family member logic here
                console.log("Family Member Added:", familyMember);
                // Clear family member form fields
                setFamilyMember({
                    firstName: "",
                    lastName: "",
                    age: 0,
                    gender: ""
                });
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
        >
            Add Family Member
        </button>

    </div>
}

export default FamilyMemberForm