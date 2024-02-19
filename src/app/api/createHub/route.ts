import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { hubName, address, vehicle, supervisor, contact } = (await req.json()) as {
            hubName: string;
            address: string;
            vehicle: string;
            supervisor: string;
            contact: string;
        };

        console.log("test createHub: ", hubName,
            address,
            vehicle,
            supervisor)

        const hub = await db.hub.create({
            data: {
                name: hubName,
                address: address,
                vehicleNumber: vehicle,
                superVisorName: supervisor,
                contact: contact
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
