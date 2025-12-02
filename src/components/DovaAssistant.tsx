import { useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import dovaMascot from "@/assets/dova-mascot.png";

const DovaAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const { language } = useLanguage();

  const bubbleText = language === "zh" 
    ? "和我聊聊，找到你的完美搭档！" 
    : "Chat with me to find a perfect match!";

  const placeholderText = language === "zh" 
    ? "输入消息..." 
    : "Type a message...";

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: message }]);
    
    // Simple mock response - can be replaced with actual AI integration
    setTimeout(() => {
      const responses = language === "zh" 
        ? [
            "你好！我是 Dova，你的 AI 助手。告诉我你在寻找什么样的合作伙伴？",
            "我可以帮你找到志同道合的创业伙伴或比赛队友！",
            "你对哪个领域感兴趣？技术、设计还是商业？"
          ]
        : [
            "Hi! I'm Dova, your AI assistant. Tell me what kind of partner you're looking for?",
            "I can help you find like-minded co-founders or competition teammates!",
            "What field are you interested in? Tech, design, or business?"
          ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
    }, 500);
    
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-2 w-80 rounded-2xl border border-border bg-card shadow-xl animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={dovaMascot} alt="Dova" className="h-8 w-8 object-contain" />
              <span className="font-semibold text-foreground">Dova</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <img src={dovaMascot} alt="Dova" className="h-16 w-16 object-contain mb-2 opacity-80" />
                <p className="text-sm">
                  {language === "zh" 
                    ? "你好！我是 Dova 👋\n有什么可以帮你的？" 
                    : "Hi! I'm Dova 👋\nHow can I help you?"}
                </p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={placeholderText}
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button with Speech Bubble */}
      <div className="flex items-center gap-3">
        {/* Speech Bubble */}
        {!isOpen && (
          <div className="relative animate-in fade-in slide-in-from-right-2 duration-500">
            <div className="rounded-full bg-card border border-border px-4 py-2 shadow-lg">
              <p className="text-sm font-medium text-foreground whitespace-nowrap">
                {bubbleText}
              </p>
            </div>
            {/* Bubble tail */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-border" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0.5 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-card" />
          </div>
        )}

        {/* Dova Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative h-16 w-16 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 border-2 border-sky-200/50"
        >
          <img
            src={dovaMascot}
            alt="Dova AI Assistant"
            className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
          />
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping" />
        </button>
      </div>
    </div>
  );
};

export default DovaAssistant;
