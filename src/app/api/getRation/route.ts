import { db } from "@/lib/db"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const hubId = searchParams.get('hubId')

    console.log("getRation hubId: ", hubId)

    if (!hubId) {
        return new Response("Missing required parameter: hubId", { status: 400 })
    }

    try {
        const rations = await db.ration.findMany({
            where: {
                hubs: { some: { id: hubId } }
            }
        });

        console.log("getRation rations: ", rations)

        return Response.json({ rations })
    } catch (error) {
        console.error('Error fetching rations: ', error);
        return new Response('Failed to fetch rations', { status: 500 })
    }
}