import React, { FC } from 'react';

interface Helpline {
    department: string;
    number: string;
}

const HelplineTable: FC = () => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr className="bg-gray-200 text-left">
                    <th scope="col" className="px-4 py-2">Department</th>
                    <th scope="col" className="px-4 py-2">Helpline Number</th>
                </tr>
            </thead>
            <tbody>
                {helplineData.map((helpline: Helpline) => (
                    <tr key={helpline.department} className="border-b hover:bg-gray-100">
                        <td className="px-4 py-2">{helpline.department}</td>
                        <td className="px-4 py-2">{helpline.number}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default HelplineTable;



const helplineData = [
    { department: "STATE HELPLINE", number: "1902" },
    { department: "EMERGENCY MEDICAL SUPPORT", number: "104/97456 97456" },
    { department: "DASOHA FOOD HELPLINE", number: "155214" },
    { department: "STATE COVID CONTROL ROOM", number: "1075, 080-46848600, 080-66692000, 9745697456, 080-1070 (SEOC), 9980299802 (MAINTAINED BY DEPARTMENT OF INFORMATION AND PUBLIC RELATIONS)" },
    { department: "HEALTH & FAMILY WELFARE", number: "104" },
    { department: "FOOD & CIVIL SUPPLIERS", number: "1967/18000-425-9339" },
    { department: "AGRICULTURE", number: "080-22212818/080-22210237" },
    { department: "PUBLIC GRIEVANCES", number: "080-44554455" },
    { department: "AMBULANCE", number: "102/108" },
    { department: "WOMEN", number: "181" },
    { department: "POLICE", number: "100" },
    { department: "BBMP", number: "080-22660000" },
    { department: "LABOUR", number: "155214" },
    { department: "BESCOM", number: "1912" },
    { department: "BWSSB", number: "1916" },
    { department: "SOCIAL WELFARE DEPARTMENT", number: "155214" },
    { department: "MGNREGA", number: "18004258666" },
];
