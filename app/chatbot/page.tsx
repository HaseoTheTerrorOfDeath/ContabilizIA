import Chatbot from "@/components/Chatbot"; // Se já existir o seu componente de Chatbot

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-6">Assistente IA</h1>
      <Chatbot />
    </div>
  );
}

