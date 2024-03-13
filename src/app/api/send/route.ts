import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, firstName, lastName } = body;
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'This is e-ration',
            react: EmailTemplate({ firstName: firstName }),
            text: "Testing resend email"
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
