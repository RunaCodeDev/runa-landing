import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessage = body.message;
    const sessionId = body.sessionId;

    // Prepare headers with proper type handling
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    // Only add API key if it exists
    if (process.env.API_BOT_KEY) {
      headers.append("x-api-token", process.env.API_BOT_KEY);
    }

    console.log("Enviando mensaje al chatbot:", userMessage);

    console.log("Usando sessionId:", sessionId);
    console.log("Usando API Key:", process.env.API_BOT_KEY ? "Sí" : "No");
    console.log("Headers:", Array.from(headers.entries()));

    // Aquí usamos la API key del servidor, no expuesta al cliente
    const response = await fetch(
      "https://n8n-runa.runa-code.com/webhook/chatbot-runa",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
        }),
      }
    );

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del webhook:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText.substring(0, 500), // Log primeros 500 caracteres
      });
      return NextResponse.json(
        { error: "El servicio de chat no está disponible en este momento" },
        { status: 503 }
      );
    }

    // Verificar que el content-type sea JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      console.error("Respuesta no es JSON:", {
        contentType,
        body: errorText.substring(0, 500),
      });
      return NextResponse.json(
        { error: "Respuesta inválida del servicio de chat" },
        { status: 502 }
      );
    }

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
