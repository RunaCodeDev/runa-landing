import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessage = body.message;

    // Prepare headers with proper type handling
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    // Only add API key if it exists
    if (process.env.API_BOT_KEY) {
      headers.append("x-api-token", process.env.API_BOT_KEY);
    }

    // Aquí usamos la API key del servidor, no expuesta al cliente
    const response = await fetch("https://n8n.runa-code.com/webhook/chatbot", {
      method: "POST",
      headers,
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error en el chatbot:", error);
    return NextResponse.json(
      { error: "Hubo un error procesando tu mensaje" },
      { status: 500 }
    );
  }
}
