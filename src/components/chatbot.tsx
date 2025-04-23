"use client";
import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";
import styles from "./chatbot.module.css";

export const Chatbot = () => {
  useEffect(() => {
    // Agregar estilos personalizados para el chatbot
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      :root {
        --chat--color-primary: #135fbb;
        --chat--color-primary-shade-50: #3a5ce5;
        --chat--color-primary-shade-100: #2a4cd3;
        --chat--color-secondary: #135fbb;
        --chat--color-secondary-shade-50: #3a5ce5;
        --chat--color-white: #ffffff;
        --chat--color-light: #f2f4f8;
        --chat--color-light-shade-50: #e6e9f1;
        --chat--color-light-shade-100: #c2c5cc;
        --chat--color-medium: #d2d4d9;
        --chat--color-dark: #101330;
        --chat--color-disabled: #777980;
        --chat--color-typing: #ffffff;

        --chat--spacing: 0.8rem;
        --chat--border-radius: 0.25rem;
        --chat--transition-duration: 0.15s;

        --chat--window--width: 400px;
        --chat--window--height: 600px;

        --chat--header-height: 80px;
        --chat--header--margin: 0px;
        --chat--header--padding: 5px;
        --chat--header--background: #135fbb;
        --chat--header--color: #ffffff;
        --chat--heading--font-size: 1.5em;
        --chat--heading--margin: 0px;
        --chat--heading--padding: 0px;
        --chat--subtitle--font-size: inherit;
        --chat--subtitle--line-height: 1.1;

        --chat--textarea--height: 50px;

        --chat--message--font-size: 0.8rem;
        --chat--message--padding: 10px;
        --chat--message--border-radius: var(--chat--border-radius);
        --chat--message-line-height: 1.2;
        --chat--message--bot--background: #135fbb;
        --chat--message--bot--color: #ffffff;
        --chat--message--bot--border: none;
        --chat--message--user--background:#ffffff;
        --chat--message--user--color: #000000;
        --chat--message--user--border: none;
        --chat--message--pre--background: rgba(0, 0, 0, 0.05);

        --chat--toggle--background: #135fbb;
        --chat--toggle--hover--background: #135fbb;
        --chat--toggle--active--background: #135fbb;
        --chat--toggle--color: #ffffff;
        --chat--toggle--size: 64px;
        --chat--toggle-icon--size: 32px;
        --chat--send-icon--size: 20px;
      }

      /* Ocultar el "Powered by n8n" */
      .n8n-chat-window-footer a {
        display: none !important;
      }
      
      /* Estilo para el icono del botón de chat */
      .n8n-chat-toggle svg {
        width: var(--chat--toggle-icon--size);
        height: var(--chat--toggle-icon--size);
      }
      
      /* Estilo para el icono de enviar */
      .n8n-chat-input-send svg {
        width: var(--chat--send-icon--size);
        height: var(--chat--send-icon--size);
      }
      
      /* Estilos para el logo en el encabezado */
      .n8n-chat-window-header-title img {
        height: 30px;
        margin-right: 10px;
        vertical-align: middle;
      }
      
      /* Estilos para asegurar que el logo en el botón flotante se muestre */
      .n8n-chat-toggle-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      
      .n8n-chat-toggle-logo img {
        max-width: 70%;
        max-height: 70%;
      }
    `;
    document.head.appendChild(styleElement);

    // Crear el chatbot con configuración personalizada
    createChat({
      webhookUrl:
        "http://localhost:5678/webhook/0b6ccc10-1977-4615-ab07-1fff91df4651/chat",
      name: "RunaCode",
      logo: window.location.origin + "/logos/runa-logo.png", // Usar path absoluto
      mode: "window", // Modo flotante
      subtitle: null,
      showWelcomeScreen: false, // Eliminar pantalla de bienvenida con botón "Nueva Conversación"
      startBehavior: "open", // Abrir el chat automáticamente al cargar
      defaultLanguage: "es", // Idioma español
      hideDefaultBranding: true, // Intentamos ocultar el branding, pero también usamos CSS
      branding: {
        logo: window.location.origin + "/logos/runa-logo.png", // Usar path absoluto
        title: "RunaCode",
        subtitle: null,
      },
      initialMessages: [
        "¡Hola! 👋",
        "Soy el asistente virtual de Runa. ¿En qué puedo ayudarte hoy?",
      ],
      i18n: {
        es: {
          title: "Asistente de Runa",
          subtitle: "Pregunta lo que necesites",
          logo: window.location.origin + "/logos/runa-logo.png", // Usar path absoluto
          inputPlaceholder: "Escribe tu pregunta...",
        },
      },
      metadata: {
        source: "runa-landing",
      },
      customIcons: {
        // Icono para el botón de chat (cuando está cerrado)
        toggle: `<div class="n8n-chat-toggle-logo"><img src="/logos/runa-logo.png" alt="Runa Logo" /></div>`,

        // Icono para cerrar el chat
        close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,

        // Icono para enviar mensaje
        send: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>`,
      },
      position: "bottom-right", // Posición del chat en la pantalla
    } as any);

    // Observador para ocultar el "Powered by n8n" si aparece después
    const observer = new MutationObserver((mutations) => {
      const footerLinks = document.querySelectorAll(
        ".n8n-chat-window-footer a"
      );
      footerLinks.forEach((link) => {
        if (link.textContent?.includes("n8n")) {
          (link as HTMLElement).style.display = "none";
        }
      });

      // Verificar y modificar el encabezado si es necesario
      const headerTitle = document.querySelector(
        ".n8n-chat-window-header-title"
      );
      if (headerTitle && !headerTitle.querySelector("img")) {
        headerTitle.innerHTML = `
          <img src="${window.location.origin}/logos/runa-logo.png" alt="Logo de Runa" />
          Asistente de Runa
          <span class="n8n-chat-window-header-subtitle">Aquí para ayudarte</span>
        `;
      }

      // Verificar si el botón de chat necesita un logo
      const chatToggle = document.querySelector(".n8n-chat-toggle");
      if (chatToggle && !chatToggle.querySelector(".n8n-chat-toggle-logo")) {
        chatToggle.innerHTML = `
          <div class="n8n-chat-toggle-logo">
            <img src="${window.location.origin}/logos/runa-logo.png" alt="Runa Logo" />
          </div>
        `;
      }
    });

    // Iniciar observación después de un breve retraso para asegurar que el chat esté montado
    setTimeout(() => {
      const chatContainer = document.querySelector(".n8n-chat");
      if (chatContainer) {
        observer.observe(chatContainer, { childList: true, subtree: true });
      }

      // Personalización adicional después de cargar
      const chatToggle = document.querySelector(".n8n-chat-toggle");
      if (chatToggle) {
        // Añadir efecto de pulso al botón de chat
        const style = document.createElement("style");
        style.textContent = `
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(74, 108, 247, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(74, 108, 247, 0); }
            100% { box-shadow: 0 0 0 0 rgba(74, 108, 247, 0); }
          }
          .n8n-chat-toggle {
            animation: pulse 2s infinite;
          }
        `;
        document.head.appendChild(style);
      }
    }, 1000);

    // Limpiar los estilos y el observador al desmontar el componente
    return () => {
      document.head.removeChild(styleElement);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.chatbotContainer}>
      <div className="n8n-chat">
        <div className="n8n-chat-toggle"></div>
        <div className="n8n-chat-window">
          <div className="n8n-chat-window-header">
            <div className="n8n-chat-window-header-title"></div>
          </div>
          <div className="n8n-chat-window-body"></div>
          <div className="n8n-chat-window-footer"></div>
        </div>
      </div>
    </div>
  );
};
