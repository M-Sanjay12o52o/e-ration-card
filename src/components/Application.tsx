import React, { FC } from 'react';

const Application: FC<{ data: any }> = ({ data }) => {
    // Handle potential missing data properties
    const { admins = [] } = data; // Set default value for admins (empty array)

    // Extract allFormData using array methods (more concise)
    const allFormData = admins.flatMap((admin: { formData: any; }) => admin.formData) || [];

    return (
        <div className="application-card">
            {/* Display "No data available" for empty allFormData */}
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
        </div>
    );
};

export default Application;
