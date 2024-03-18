import React, { FC } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

const Application: FC<{ data: any }> = ({ data }) => {
    // Handle potential missing data properties
    const { admins = [] } = data; // Set default value for admins (empty array)

    // Extract allFormData using array methods (more concise)
    const allFormData = admins.flatMap((admin: { formData: any; }) => admin.formData) || [];

    return (
        <div className='w-44 h-10 bg-slate-500 rounded-md mt-4 text-center align-middle'>
            <AlertDialog>
                <AlertDialogTrigger>View Applications</AlertDialogTrigger>
                {/* Display "No data available" for empty allFormData */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Applications data.</AlertDialogTitle>
                        <AlertDialogDescription>
                            These are the open applications for Card.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {allFormData.length === 0 && <p>No data available</p>}
                    {allFormData.map((applicationData: any) => (
                        <div key={applicationData.id}>
                            {/* Render individual application details */}
                            <p>Applicant Name: {applicationData.firstName} {applicationData.lastName}</p>
                            <p>Phone Number: {applicationData.number}</p>
                            <p>Email: {applicationData.emai}</p>
                            {/* Add more properties as needed */}
                        </div>
                    ))}
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Application;
