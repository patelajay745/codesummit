
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export class ResendMailer {
    email: string
    constructor(email: string) {
        this.email = email;
    }

    async sendMail({ subject, html }: { subject: string, html: string }) {
        try {
            const response = await resend.emails.send({
                from: "CodeSummit <admin@codesummit.ca>",
                to: [this.email],
                subject: subject,
                html: html,
            });

            console.log("Email sent successfully:", response);

            return response;
        } catch (error) {
            console.error("Error sending email with Resend:", error);
        }
    }
}