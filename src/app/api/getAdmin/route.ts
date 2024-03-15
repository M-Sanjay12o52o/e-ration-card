import { db } from "@/lib/db";
import { Prisma } from '@prisma/client';

export async function GET() {
    try {
        const admins = await db.user.findMany({
            where: {
                role: "ADMIN"
            }
        })

        return new Response(JSON.stringify({ admins }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error.message }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        });
    }
}
