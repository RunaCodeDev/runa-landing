// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validar los datos recibidos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Configurar el transporte de correo
    // Para desarrollo, puedes usar un servicio como Mailtrap o ethereal.email
    // Para producción, configura con tu proveedor de correo (Gmail, SendGrid, etc.)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Configurar el correo
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Mensaje: ${message}
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .container {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 25px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 15px;
              border-bottom: 2px solid #f0f0f0;
              margin-bottom: 20px;
            }
            .header h2 {
              color: #3b82f6;
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 10px 0;
            }
            .field {
              margin-bottom: 15px;
            }
            .field strong {
              color: #3b82f6;
              font-weight: 600;
            }
            .message-box {
              background-color: #f0f7ff;
              border-left: 4px solid #3b82f6;
              padding: 15px;
              margin-top: 10px;
              border-radius: 4px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #666;
              margin-top: 30px;
              padding-top: 15px;
              border-top: 1px solid #eee;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Nuevo Mensaje de Contacto</h2>
            </div>
            <div class="content">
              <div class="field">
                <strong>Nombre:</strong> ${name}
              </div>
              <div class="field">
                <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="field">
                <strong>Mensaje:</strong>
                <div class="message-box">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>
            <div class="footer">
              Este mensaje fue enviado desde el formulario de contacto de RunaCode.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
