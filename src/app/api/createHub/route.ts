import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { hubName, address, vehicle, supervisor } = (await req.json()) as {
            hubName: string;
            address: string;
            vehicle: string;
            supervisor: string;
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
