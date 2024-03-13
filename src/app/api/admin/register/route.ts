import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { username, email, password, mobNumber } = (await req.json()) as {
            username: string;
            email: string;
            password: string;
            mobNumber: string;
        };
        const hashed_password = await hash(password, 12);

        const user = await db.admin.create({
            data: {
                name: username,
                email: email.toLowerCase(),
                password: hashed_password,
                number: mobNumber,
                role: "ADMIN"
            },
        });

        return NextResponse.json({
            user: {
                name: username,
                email: email,
                number: mobNumber
            },
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
