import { X } from 'lucide-react';
import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';

interface AddHubFormProps {
    setAddHub: Dispatch<SetStateAction<boolean>>
}

const AddHubForm: FC<AddHubFormProps> = ({ setAddHub }) => {
    const [hubName, setHubName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [vehicle, setVehicle] = useState<string>("");
    const [supervisor, setSupervisor] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Hub Name:", hubName);
        console.log("Address:", address);
        console.log("Vehicle Number:", vehicle);
        console.log("Supervisor Name:", supervisor);
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
                        placeholder="Enter hub name"
                        className="block w-full px-3 py-2 rounded border focus:ring-indigo-500 focus:border-indigo-500"
                        value={hubName}
                        onChange={(e) => setHubName(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 mb-4">
                    <label className="block font-medium text-gray-700 mb-2">Address</label>
                    <input
                        type="text"
                        placeholder="Enter hub address"
                        className="block w-full px-3 py-2 rounded border focus:ring-indigo-500 focus:border-indigo-500"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 mb-4">
                    <label className="block font-medium text-gray-700 mb-2">Vehicle Number</label>
                    <input
                        type="text"
                        placeholder="Enter vehicle number"
                        className="block w-full px-3 py-2 rounded border focus:ring-indigo-500 focus:border-indigo-500"
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 mb-4">
                    <label className="block font-medium text-gray-700 mb-2">Supervisor Name</label>
                    <input
                        type="text"
                        placeholder="Enter supervisor name"
                        className="block w-full px-3 py-2 rounded border focus:ring-indigo-500 focus:border-indigo-500"
                        value={supervisor}
                        onChange={(e) => setSupervisor(e.target.value)}
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
