import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { firstName,
            lastName,
            address,
            familyCount,
            gender,
            number,
            email
            // familyMembers
        } = (await req.json()) as {
            firstName: string,
            lastName: string,
            address: string;
            familyCount: string;
            gender: string;
            number: string;
            email: string;
            // familyMembers: string;
        };

        const familyCountInt = parseInt(familyCount, 10)

        const hub = await db.cardHolder.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                address: address,
                familyCount: familyCountInt,
                gender: gender,
                number: number,
                email: email
                // familyMembers: familyMembers
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