import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const {
            fullName,
            age,
            relation,
            number
        } = (await req.json()) as {
            fullName: string,
            age: string,
            relation: string,
            number: string
        }

        const ageNumber = parseInt(age, 10)

        const familyMember = await db.familyMember.create({
            data: {
                fullName,
                age: ageNumber,
                relation,
                number
            }
        })

        console.log("familyMember: ", familyMember)

        return new Response(JSON.stringify(familyMember), {
            status: 201,
            statusText: "Family Member Created"
        });
    } catch (error: any) {
        console.error("Error creating family member: ", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        })
    }
}