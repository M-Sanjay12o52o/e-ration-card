import { db } from "@/lib/db"

export async function GET() {
    const res = await db.cardHolder.findMany();

    return Response.json({ res })
}