import { db } from "@/lib/db"

export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url)
        const cardHolderId = searchParams.get('cardHolderId')

        console.log("api route cardHolderId: ", cardHolderId)

        if (!cardHolderId) {
            return new Response(JSON.stringify({ message: "Missing card holder ID" }), {
                status: 400,
            });
        }

        const cardHolder = await db.cardHolder.findUnique({
            where: { id: cardHolderId },
        });

        if (!cardHolder) {
            return new Response(JSON.stringify({ message: "Card holder not found" }), {
                status: 404,
            })
        }

        return new Response(JSON.stringify({ cardHolder }), {
            status: 200,
        })
    } catch (error) {
        console.error("Error fetching card holder: ", error)
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
        })
    }
}