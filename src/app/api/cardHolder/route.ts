import { db } from "@/lib/db"

export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url)
        const userEmail = searchParams.get('userEmail')

        console.log("userEmail route: ", userEmail)

        if (!userEmail) {
            return new Response(JSON.stringify({ message: "Missing email id" }), {
                status: 400,
            });
        }

        const cardHolder = await db.cardHolder.findUnique({
            where: { email: userEmail },
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