import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450259077/HbZCzrQQJzoEYBqv.png";

function buildEmailHtml(title: string, fields: { label: string; value: string }[]): string {
  const rows = fields
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:10px 16px;background:#f9f7ff;font-weight:600;color:#6d28d9;font-size:13px;width:160px;border-bottom:1px solid #ede9fe;white-space:nowrap;vertical-align:top;">${label}</td>
          <td style="padding:10px 16px;background:#ffffff;color:#1f1f2e;font-size:13px;border-bottom:1px solid #ede9fe;vertical-align:top;line-height:1.6;">${value.replace(/\n/g, "<br/>")}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f0ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f0ff;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(109,40,217,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7c3aed 0%,#db2777 100%);padding:24px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;">
                  <img src="${LOGO_URL}" alt="OptimAI" height="36" style="display:block;height:36px;width:auto;" />
                </td>
                <td align="right" style="vertical-align:middle;">
                  <span style="color:rgba(255,255,255,0.85);font-size:12px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;">${title}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Table -->
        <tr>
          <td style="padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${rows}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f7ff;padding:16px 24px;border-top:1px solid #ede9fe;">
            <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
              This email was sent automatically by OptimAI &mdash; <a href="https://optimai.com.au" style="color:#7c3aed;text-decoration:none;">optimai.com.au</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/**
 * Sends an HTML email to hello@optimai.com.au via Resend.
 */
export async function sendEmail(
  subject: string,
  fields: { label: string; value: string }[],
  replyTo?: string
): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not set — skipping.");
    return;
  }

  try {
    const resend = getResend();
    const html = buildEmailHtml(subject, fields);

    await resend.emails.send({
      from: "OptimAI <hello@optimai.com.au>",
      to: "hello@optimai.com.au",
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    console.log(`[Email] Sent: ${subject}`);
  } catch (err) {
    console.warn("[Email] Failed to send via Resend:", err);
  }
}
