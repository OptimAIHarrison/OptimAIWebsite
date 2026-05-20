import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

/**
 * Sends a plain-text email to hello@optimai.com.au via Resend.
 * replyTo is set to the submitter's email so you can reply directly.
 */
export async function sendEmail(
  subject: string,
  body: string,
  replyTo?: string
): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not set — skipping.");
    return;
  }

  try {
    const resend = getResend();
    await resend.emails.send({
      from: "OptimAI <hello@optimai.com.au>",
      to: "hello@optimai.com.au",
      subject,
      text: body,
      ...(replyTo ? { replyTo } : {}),
    });
    console.log(`[Email] Sent: ${subject}`);
  } catch (err) {
    console.warn("[Email] Failed to send via Resend:", err);
  }
}
