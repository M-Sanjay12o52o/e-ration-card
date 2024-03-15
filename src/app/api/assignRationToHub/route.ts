import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { hubId, rationData } = await req.json();

        console.log("rationData: ", rationData);

        if (!hubId || !rationData) {
            throw new Error("Hub ID and ration data are required")
        }

        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 6);

        // Array to store updated or created rations
        const updatedRations = [];

        // Loop through each ration item
        for (const rationItem of rationData) {
            const { id, name, quantity } = rationItem;

            // Find existing ration by name
            const existingRation = await db.ration.findFirst({
                where: { name: name }
            });

            if (existingRation) {
                // Update existing ration quantity and expiry date
                const updatedExistingRation = await db.ration.update({
                    where: { id: existingRation.id },
                    data: {
                        quantity: { increment: quantity },
                        expiryDate
                    }
                });
                updatedRations.push(updatedExistingRation);
            } else {
                // Create a new ration
                const createdRation = await db.ration.create({
                    data: {
                        name,
                        quantity,
                        expiryDate,
                        hubs: {
                            connect: { id: hubId }
                        },
                    }
                });
                updatedRations.push(createdRation);
            }
        }

        return NextResponse.json({
            status: "success",
            message: "Ration data posted successfully",
            data: updatedRations
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
