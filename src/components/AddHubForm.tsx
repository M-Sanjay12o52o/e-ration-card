import axios from 'axios';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';

interface AddHubFormProps {
    setAddHub: Dispatch<SetStateAction<boolean>>
}

const AddHubForm: FC<AddHubFormProps> = ({ setAddHub }) => {
    const [error, setError] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formValues, setFormValues] = useState({
        hubName: "",
        address: "",
        vehicle: "",
        supervisor: "",
        contact: ""
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        console.log("formvalues: ", formValues)
        setFormValues({
            hubName: "",
            address: "",
            vehicle: "",
            supervisor: "",
            contact: ""
        })

        try {
            const response = await fetch('/api/createHub', {
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
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-2xl font-bold mb-4">Add Hub Form</h1>

            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-md">
                <X className='ml-[1250px]' onClick={() => setAddHub(false)} />
                <div className="grid grid-cols-1 mb-4">
                    <label className="block font-medium text-gray-700 mb-2">Hub Name</label>
                    <input
                        type="text"
                        name='hubName'
                        placeholder="Enter hub name"
                        className="block w-full px-3 py-2 rounded border focus:ring-indigo-500 focus:border-indigo-500"
                        value={formValues.hubName}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 mb-4">
                    <label className="block font-medium text-gray-700 mb-2">Address</label>
                    <input
                        type="text"
                        name='address'
                        placeholder="Enter hub address"
                        className="block w-full px-3 py-2 rounded border focus:ring-indigo-500 focus:border-indigo-500"
                        value={formValues.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 mb-4">
                    <label className="block font-medium text-gray-700 mb-2">Vehicle Number</label>
                    <input
                        type="text"
                        name='vehicle'
                        placeholder="Enter vehicle number"
                        className="block w-full px-3 py-2 rounded border focus:ring-indigo-500 focus:border-indigo-500"
                        value={formValues.vehicle}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 mb-4">
                    <label className="block font-medium text-gray-700 mb-2">Supervisor Name</label>
                    <input
                        type="text"
                        name='supervisor'
                        placeholder="Enter supervisor name"
                        className="block w-full px-3 py-2 rounded border focus:ring-indigo-500 focus:border-indigo-500"
                        value={formValues.supervisor}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 mb-4">
                    <label className="block font-medium text-gray-700 mb-2">Contact</label>
                    <input
                        type="text"
                        name='contact'
                        placeholder="Enter contact info"
                        className="block w-full px-3 py-2 rounded border focus:ring-indigo-500 focus:border-indigo-500"
                        value={formValues.contact}
                        onChange={handleChange}
                    />
                </div>

                <button className="bg-indigo-500 text-white w-full py-2 rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none">
                    Add Hub
                </button>
            </form>
        </div>
    );
};

export default AddHubForm;
