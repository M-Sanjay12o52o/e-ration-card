import { db } from "@/lib/db"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const hubId = searchParams.get('hubId')

    console.log("hubId: ", hubId)

    if (!hubId) {
        return new Response("Missing required parameter: hubId", { status: 400 })
    }

    try {
        const rations = await db.ration.findMany({
            include: { hubs: true }
        });

        return Response.json({ rations })
    } catch (error) {
        console.error('Error fetching rations: ', error);
        return new Response('Failed to fetch rations', { status: 500 })
    }
}