import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
export async function sendMail(email, name, token, userId) {
  const config = useRuntimeConfig();
  const mailerSend = new MailerSend({
    apiKey: config.mailApiKey,
  });

  const sentFrom = new Sender(
    "info@captionsaz.ir",
    "کپشن ساز - فعالسازی ایمیل"
  );

  const recipients = [new Recipient(email, name)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("فعالسازی ایمیل - کپشن ساز")
    .setHtml(
      `
      <!DOCTYPE html>
      <html dir="rtl" lang="fa">
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Tahoma, Arial, sans-serif;
            background: #f5f5f5;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .content {
            padding: 30px;
            text-align: center;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
            color: white;
            padding: 15px 40px;
            border-radius: 8px;
            text-decoration: none;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
          }
          .link {
            color: #9333ea;
            word-break: break-all;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>خوش آمدید ${name}! 👋</h1>
          </div>
          <div class="content">
            <p style="font-size: 16px; line-height: 1.8;">
              از ثبت‌نام شما در <strong>کپشن ساز</strong> خوشحالیم!
            </p>
            <p style="font-size: 16px; line-height: 1.8;">
              برای فعال‌سازی حساب کاربری، لطفا روی لینک زیر کلیک کنید:
            </p>
            <p class="link" style="font-size: 12px;">
              ${config.gatewayRedirectUrl}auth/verifymail?token=${token}&userId=${userId}
            </p>
            <p style="font-size: 14px; color: #ef4444; margin-top: 20px;">
              ⚠️ این لینک تا 15 دقیقه معتبر است
            </p>
          </div>
          <div class="footer">
            <p>این ایمیل توسط سیستم خودکار ارسال شده است</p>
            <p>کپشن ساز - ساخت کپشن هوشمند با AI</p>
          </div>
        </div>
      </body>
      </html>
    `
    )
    .setText(" ");
  try {
    await mailerSend.email.send(emailParams);
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Internal Server Error : Email Failed",
    });
  }
}
