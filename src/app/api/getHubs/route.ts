import { db } from "@/lib/db"

export async function GET() {
    const res = await db.hub.findMany();

    return Response.json({ res })
}