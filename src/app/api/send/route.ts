import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['msnjy12o52o@gmail.com'],
            subject: 'Hello world',
            react: EmailTemplate({ firstName: 'John' }),
            text: "Test text"
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
