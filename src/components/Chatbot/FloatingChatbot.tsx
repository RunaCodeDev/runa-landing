"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RefreshCw, Bot } from "lucide-react";
import TypewriterEffect from "./TypewriterEffect";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isTyping?: boolean;
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const t = useTranslations();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: t("floatingChatbot.firstMessage"),
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setTooltipOpen(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTooltipOpen(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const tempId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: tempId, text: "", isUser: false, isTyping: true },
    ]);

    try {
      const response = await fetch(
        "https://n8n.runa-code.com/webhook/chatbot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-token": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({ message: userMessage.text }),
        }
      );

      const data = await response.json();
      const botResponse =
        data.response || "Lo siento, no pude procesar tu solicitud.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? {
                id: tempId,
                text: botResponse,
                isUser: false,
                isTyping: true,
              }
            : msg
        )
      );

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId
              ? {
                  id: tempId,
                  text: botResponse,
                  isUser: false,
                  isTyping: false,
                }
              : msg
          )
        );
      }, botResponse.length * 30 + 500);
    } catch (error) {
      const errorMessage = `Lo siento, hubo un error al procesar tu solicitud. ${error}`;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? {
                id: tempId,
                text: errorMessage,
                isUser: false,
                isTyping: true,
              }
            : msg
        )
      );

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId
              ? {
                  id: tempId,
                  text: errorMessage,
                  isUser: false,
                  isTyping: false,
                }
              : msg
          )
        );
      }, errorMessage.length * 30 + 500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: "¡Hola! Soy el asistente virtual de Runa. ¿En qué puedo ayudarte hoy?",
        isUser: false,
      },
    ]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
          <TooltipTrigger asChild>
            <motion.button
              className="fixed bottom-6 right-6 bg-[#135fbb] hover:bg-[#0d4a9e] text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsOpen(true);
                setTooltipOpen(false);
              }}
              aria-label="Abrir chat"
            >
              <Bot size={26} />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={10}>
            <p>{t("floatingChatbot.welcome")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50 overflow-hidden border border-gray-200"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-[#135fbb] text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Image
                  src="/logos/runa-logo.png"
                  width={30}
                  height={30}
                  alt="Runa Logo"
                  className="rounded-full bg-white p-1"
                />
                <h3 className="font-semibold">{t("floatingChatbot.name")}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleResetChat}
                  className="text-white hover:bg-[#0d4a9e] rounded-md px-2 py-1 text-xs transition-colors flex items-center"
                  aria-label="Reiniciar chat"
                >
                  <RefreshCw size={14} className="mr-1" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-[#0d4a9e] rounded-full p-1 transition-colors"
                  aria-label="Cerrar chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                        message.isUser
                          ? "bg-[#135fbb] text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                      }`}
                    >
                      {message.isTyping ? (
                        <TypewriterEffect text={message.text} />
                      ) : (
                        <p className="text-sm">{message.text}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t("floatingChatbot.inputPlaceholder")}
                  className="flex-1 p-1 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#135fbb] text-gray-700"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-[#135fbb] text-white p-2 rounded-r-lg hover:bg-[#0d4a9e] focus:outline-none focus:ring-2 focus:ring-[#135fbb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  aria-label="Enviar mensaje"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
