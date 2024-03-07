import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { firstName,
            lastName,
            number,
            email,
            age,
            address,
            familyCount,
            gender,
        } = (await req.json()) as {
            firstName: string,
            lastName: string,
            number: string;
            email: string;
            age: string,
            gender: string;
            address: string;
            familyCount: string;
        };

        const ageNumber = parseInt(age, 10)

        const familyCountInt = parseInt(familyCount, 10)

        const hub = await db.cardHolder.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                number: number,
                email: email,
                age: ageNumber,
                address: address,
                familyCount: familyCountInt,
                gender: gender,
            },
        });

        return NextResponse.json({
            hub
        });
    } catch (error: any) {
        // Handle Prisma-specific errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2002': // Unique constraint violation
                    return new NextResponse(
                        JSON.stringify({
                            status: "error",
                            message: `Card holder with those details already exists.`,
                        }),
                        { status: 409 } // Conflict
                    );
                case 'P2003': // Invalid data
                    return new NextResponse(
                        JSON.stringify({
                            status: "error",
                            message: `Invalid data provided. Please check the values and try again.`,
                        }),
                        { status: 400 } // Bad Request
                    );
                default:
                    // Handle other Prisma errors
                    console.error('Prisma error creating card holder:', error);
                    return new NextResponse(
                        JSON.stringify({
                            status: "error",
                            message: "Database error occurred. Please try again later.",
                        }),
                        { status: 500 }
                    );
            }
        }

        // Handle other general errors
        else if (error instanceof Error) {
            console.error('General error creating card holder:', error);
            return new NextResponse(
                JSON.stringify({
                    status: "error",
                    message: "An unexpected error occurred. Please try again later.",
                }),
                { status: 500 }
            );
        }
    }
}