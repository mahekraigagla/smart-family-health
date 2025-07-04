
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Users, Calendar, FileText, CreditCard, Heart, MessageCircle, Send } from 'lucide-react';

const Index = () => {
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m Pariwar+ Genie, your AI Health Assistant. I can help answer health-related questions, explain symptoms, and interpret basic medical information. How can I assist you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simple AI response simulation
    setTimeout(() => {
      const responses = [
        "Thank you for your question. For specific medical concerns, please consult with a healthcare professional. I can provide general health information to help you understand symptoms better.",
        "That's a great health question! Based on general medical knowledge, here's what I can share... However, please remember this is for informational purposes only.",
        "I understand your concern. While I can provide general health information, it's important to consult with a qualified healthcare provider for proper diagnosis and treatment.",
        "Here's some general information about that health topic... Please note that this should not replace professional medical advice."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
    }, 1000);
    
    setChatInput('');
  };

  const features = [
    {
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      title: "Medicine Reminders",
      description: "Never miss your medications with smart notifications"
    },
    {
      icon: <Calendar className="w-8 h-8 text-green-600" />,
      title: "Appointment Tracking",
      description: "Keep track of all family medical appointments"
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: "Medical Documents",
      description: "Securely store and organize medical records"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-orange-600" />,
      title: "Expense Tracker",
      description: "Monitor healthcare expenses with detailed reports"
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Family Management",
      description: "Manage health records for entire family"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Emergency QR Cards",
      description: "Quick access to critical health information"
    }
  ];

  const faqData = [
    {
      question: "What is Pariwar+ and how does it work?",
      answer: "Pariwar+ is a comprehensive family health management platform that helps you track medications, appointments, medical documents, and health expenses for your entire family. Each family member gets their own secure account with personalized health tracking."
    },
    {
      question: "Is my health data secure and private?",
      answer: "Yes, absolutely. We use bank-level encryption to protect your data. Each user can only access their own health information, and we never share your personal health data with third parties without your explicit consent."
    },
    {
      question: "Can I use Pariwar+ for multiple family members?",
      answer: "Yes! Pariwar+ is designed for families. You can create separate profiles for each family member, and each person will have their own login credentials and private health data."
    },
    {
      question: "How do medicine reminders work?",
      answer: "You can set up personalized medication schedules for each family member. The app will send push notifications and email reminders at the specified times. You can also mark medications as taken to track adherence."
    },
    {
      question: "What types of medical documents can I upload?",
      answer: "You can upload various medical documents including prescriptions, lab reports, X-rays, medical certificates, vaccination records, and insurance documents. All files are securely encrypted and stored."
    },
    {
      question: "How does the expense tracking feature work?",
      answer: "The expense tracker allows you to log medical expenses by category (medicines, consultations, tests, etc.) and provides monthly/yearly summaries with detailed reports and charts to help you manage healthcare costs."
    },
    {
      question: "What is the Emergency QR Card feature?",
      answer: "The Emergency QR Card contains critical health information like allergies, chronic conditions, emergency contacts, and current medications. Healthcare providers can quickly scan the QR code to access vital information during emergencies."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, Pariwar+ is available as a web application that works seamlessly on all devices including smartphones, tablets, and computers. A dedicated mobile app is in development."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Pariwar+</h1>
              <Badge variant="secondary">Together in Care</Badge>
            </div>
            <div className="flex space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    AI Health Assistant
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      Pariwar+ Genie
                    </DialogTitle>
                    <DialogDescription>
                      Your AI Health Assistant for general health information
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <ScrollArea className="h-64 w-full border rounded-md p-4">
                      <div className="space-y-3">
                        {chatMessages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.role === 'user'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Ask about health symptoms, medications..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      *This is for informational purposes only. Always consult healthcare professionals for medical advice.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section with Health Image */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Smart Family Health Management
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Track medications, appointments, documents, and expenses for your entire family. 
            Each member gets personalized health management with secure, private access.
          </p>
          <div className="mb-8">
            <img 
              src="/lovable-uploads/f75a85e6-a064-4da0-8cfc-4c720a2954a6.png" 
              alt="Health and Wellness Illustration" 
              className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Managing Health
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {feature.icon}
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold">Pariwar+</h3>
              </div>
              <p className="text-gray-400">
                Together in Care - Smart family health management for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Medicine Reminders</li>
                <li>Appointment Tracking</li>
                <li>Document Storage</li>
                <li>Expense Management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Newsletter</li>
                <li>Blog</li>
                <li>Community</li>
                <li>Feedback</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Pariwar+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
