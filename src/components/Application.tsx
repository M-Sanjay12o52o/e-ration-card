import React, { FC } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

export const dynamic = 'force-dynamic'

const Application: FC<{ applications: any }> = ({ applications }) => {
    return (
        <div className='w-44 h-10 bg-slate-600 rounded-md mt-4 text-center align-middle'>
            <AlertDialog>
                <AlertDialogTrigger className='pt-2'>View Applications</AlertDialogTrigger>
                {/* Display "No data available" for empty allFormData */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Applications data.</AlertDialogTitle>
                        <AlertDialogDescription>
                            These are the open applications for Card.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {applications.length === 0 && <p>No data available</p>}
                    {applications.map((applicationData: any) => (
                        <div key={applicationData.id}>
                            {/* Render individual application details */}
                            <p>Applicant Name: {applicationData.firstName} {applicationData.lastName}</p>
                            <p>Phone Number: {applicationData.number}</p>
                            <p>Email: {applicationData.email}</p>
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
