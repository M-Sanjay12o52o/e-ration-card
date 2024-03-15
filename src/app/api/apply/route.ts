import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const { id, formData } = await req.json();

        console.log("id: ", id, "formData: ", formData)

        const {
            firstName,
            lastName,
            number,
            email,
            age,
            gender,
            address,
            familyCount,
        } = formData;

        const applicationData = await db.applicationData.create({
            data: {
                firstName,
                lastName,
                number,
                emai: email,
                age,
                gender,
                address,
                familyCount,
            },
        })

        const application = await db.application.create({
            data: {
                formData: {
                    connect: { id: applicationData.id },
                },
                userId: id,
            },
        });

        return NextResponse.json({
            message: "Application submitted successfully",
            application
        });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
