import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {
            id,
            name,
            address,
            vehicleNumber,
            superVisorName,
            superVisorContact
        } = (await req.json()) as {
            id: string;
            name: string;
            address: string;
            vehicleNumber: string;
            superVisorName: string;
            superVisorContact: string;
        };

        const hub = await db.hub.create({
            data: {
                name,
                address,
                vehicleNumber,
                superVisorName,
                superVisorContact
            },
        });

        return NextResponse.json({
            hub
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
