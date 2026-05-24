import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null);

        if (!body) {
            return NextResponse.json(
                { error: 'Invalid JSON request body.' },
                { status: 400 }
            );
        }

        const { name, email, message } = body;

        // Basic server-side validation
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return NextResponse.json(
                { error: 'Name is required and must be a string.' },
                { status: 400 }
            );
        }

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json(
                { error: 'A valid email address is required.' },
                { status: 400 }
            );
        }

        if (!message || typeof message !== 'string' || message.trim() === '') {
            return NextResponse.json(
                { error: 'Message content is required.' },
                { status: 400 }
            );
        }

        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not defined in environment variables.');
            return NextResponse.json(
                { error: 'Email service configuration error.' },
                { status: 500 }
            );
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send the email using Resend
        // We send *to* info@banavatnest.com
        // We set 'replyTo' to the user's email so they can click "Reply" directly in their inbox to respond!
        const data = await resend.emails.send({
            from: 'BanavatNest <noreply@banavatnest.com>',
            to: 'Sukhdev200@gmail.com',
            replyTo: email,
            subject: `New Inquiry: ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
                    <div style="background-color: #3A9B9B; padding: 16px; border-radius: 8px 8px 0 0; text-align: center;">
                        <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">BanavatNest</h2>
                        <p style="color: #e2f1f1; margin: 4px 0 0 0; font-size: 14px;">New Website Form Submission</p>
                    </div>
                    <div style="padding: 24px; color: #1f2937; line-height: 1.6;">
                        <p style="margin-top: 0;">Hello Team,</p>
                        <p>You have received a new contact inquiry from the BanavatNest official website.</p>
                        
                        <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 20px 0;" />
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #4b5563; vertical-align: top;">Name:</td>
                                <td style="padding: 8px 0; color: #111827; vertical-align: top;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #4b5563; vertical-align: top;">Email:</td>
                                <td style="padding: 8px 0; color: #111827; vertical-align: top;"><a href="mailto:${email}" style="color: #3A9B9B; text-decoration: none;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #4b5563; vertical-align: top;">Message:</td>
                                <td style="padding: 8px 0; color: #111827; white-space: pre-wrap; vertical-align: top;">${message}</td>
                            </tr>
                        </table>
                        
                        <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 20px 0;" />
                        
                        <p style="font-size: 13px; color: #6b7280; margin-bottom: 0;">
                            💡 <em>To reply to this person, simply hit **Reply** to this email. Their address has been set as the Reply-To field automatically.</em>
                        </p>
                    </div>
                    <div style="background-color: #f9fafb; padding: 12px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
                        Sent from BanavatNest Website Incubator Platform
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true, id: data.data?.id });
    } catch (error: any) {
        console.error('Error handling contact form submission:', error);
        return NextResponse.json(
            { error: error.message || 'An unexpected error occurred.' },
            { status: 500 }
        );
    }
}
