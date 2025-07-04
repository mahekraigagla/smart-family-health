
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send } from "lucide-react";
import { ChatMessage } from '@/types/health';
import { t } from '@/utils/i18n';

const AIHealthAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: t('aiGreeting'),
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('fever') || message.includes('बुखार')) {
      return 'For fever, ensure rest, stay hydrated, and monitor temperature. If fever persists above 102°F (39°C) or lasts more than 3 days, consult a doctor. This is not medical advice - always consult healthcare professionals for proper diagnosis.';
    }
    
    if (message.includes('headache') || message.includes('सिरदर्द')) {
      return 'For headaches, try rest in a quiet, dark room, stay hydrated, and consider gentle neck stretches. If headaches are severe, frequent, or accompanied by other symptoms, please consult a healthcare provider.';
    }
    
    if (message.includes('medicine') || message.includes('दवा')) {
      return 'Always take medicines as prescribed by your doctor. Never skip doses, and complete the full course even if you feel better. Store medicines properly and check expiry dates regularly.';
    }
    
    if (message.includes('vaccination') || message.includes('टीका')) {
      return 'Vaccinations are important for preventing diseases. Follow the recommended vaccination schedule for children and adults. Consult your doctor about which vaccines you and your family need.';
    }
    
    if (message.includes('diet') || message.includes('आहार')) {
      return 'A balanced diet includes fruits, vegetables, whole grains, lean proteins, and plenty of water. Limit processed foods, sugar, and excessive salt. Consult a nutritionist for personalized dietary advice.';
    }
    
    return 'Thank you for your question. For specific medical concerns, I recommend consulting with a qualified healthcare professional who can provide personalized advice based on your medical history and current condition.';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: generateAIResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('aiAssistant')}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2 pt-4 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('askQuestion')}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIHealthAssistant;
