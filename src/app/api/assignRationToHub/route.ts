import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { hubId, rationData } = await req.json();

        if (!hubId || !rationData) {
            throw new Error("Hub ID and ration data are required")
        }

        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 6);

        // const createdRation = await db.ration.create({
        //     data: {
        //         name: rationData.name,
        //         quantity: rationData.quantity,
        //         expiryDate,
        //         Hub: {
        //             connect: { id: hubId }
        //         }
        //     }
        // })

        const createdRations = await Promise.all(rationData.map(async (rationItem: Product) => {
            console.log("rationItem: ", rationItem)

            const { id, name, qty } = rationItem;

            const createdRation = await db.ration.create({
                data: {
                    name,
                    quantity: qty,
                    expiryDate,
                    Hub: {
                        connect: { id: hubId }
                    }
                }
            })
            return createdRation;
        }))

        console.log("createdRations: ", createdRations)

        return NextResponse.json({
            status: "success",
            message: "Ration data posted successfully",
            data: createdRations
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
