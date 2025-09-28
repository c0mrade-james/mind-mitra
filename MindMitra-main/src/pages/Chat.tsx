// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { useToast } from '@/hooks/use-toast';
// import { 
//   Send, 
//   Bot, 
//   User, 
//   Heart, 
//   AlertTriangle, 
//   Calendar,
//   BookOpen,
//   HelpCircle,
//   Lightbulb
// } from 'lucide-react';
// import { aiResponses } from '@/data/mockData';

// interface Message {
//   id: string;
//   content: string;
//   sender: 'user' | 'ai';
//   timestamp: Date;
//   type?: 'text' | 'suggestion' | 'crisis' | 'resource';
//   metadata?: {
//     severity?: 'low' | 'moderate' | 'high';
//     category?: string;
//     suggestions?: string[];
//   };
// }

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       content: aiResponses.greeting,
//       sender: 'ai',
//       timestamp: new Date(),
//       type: 'text',
//     },
//   ]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const { toast } = useToast();
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const detectSentiment = (message: string): { category: string; severity: 'low' | 'moderate' | 'high' } => {
//     const lowerMessage = message.toLowerCase();
    
//     // Crisis keywords
//     const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'can\'t go on'];
//     if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
//       return { category: 'crisis', severity: 'high' };
//     }
    
//     // Anxiety keywords
//     const anxietyKeywords = ['anxious', 'panic', 'worried', 'stressed', 'overwhelmed', 'nervous'];
//     if (anxietyKeywords.some(keyword => lowerMessage.includes(keyword))) {
//       const severity = lowerMessage.includes('extremely') || lowerMessage.includes('very') ? 'high' : 
//                       lowerMessage.includes('somewhat') || lowerMessage.includes('a little') ? 'low' : 'moderate';
//       return { category: 'anxiety', severity };
//     }
    
//     // Depression keywords
//     const depressionKeywords = ['depressed', 'sad', 'hopeless', 'empty', 'lonely', 'worthless'];
//     if (depressionKeywords.some(keyword => lowerMessage.includes(keyword))) {
//       const severity = lowerMessage.includes('extremely') || lowerMessage.includes('very') ? 'high' : 
//                       lowerMessage.includes('somewhat') || lowerMessage.includes('a little') ? 'low' : 'moderate';
//       return { category: 'depression', severity };
//     }
    
//     // Academic stress
//     const academicKeywords = ['exam', 'test', 'assignment', 'study', 'grade', 'deadline'];
//     if (academicKeywords.some(keyword => lowerMessage.includes(keyword))) {
//       return { category: 'academic', severity: 'moderate' };
//     }
    
//     return { category: 'general', severity: 'low' };
//   };

//   const generateAIResponse = (userMessage: string): Message => {
//     const sentiment = detectSentiment(userMessage);
//     let response = '';
//     let type: Message['type'] = 'text';
//     let suggestions: string[] = [];

//     if (sentiment.category === 'crisis') {
//       response = aiResponses.crisis;
//       type = 'crisis';
//       suggestions = [
//         'Call emergency services: 911',
//         'Crisis Text Line: Text HOME to 741741',
//         'Book urgent counselor session'
//       ];
//     } else if (sentiment.category === 'anxiety') {
//       response = aiResponses.anxiety[sentiment.severity];
//       suggestions = [
//         'Try the 5-4-3-2-1 grounding technique',
//         'Practice deep breathing',
//         'Book a counseling session'
//       ];
//     } else if (sentiment.category === 'depression') {
//       response = aiResponses.depression[sentiment.severity];
//       suggestions = [
//         'Explore self-care activities',
//         'Connect with a counselor',
//         'Join peer support forum'
//       ];
//     } else if (sentiment.category === 'academic') {
//       response = aiResponses.stress.academic;
//       suggestions = [
//         'Learn time management techniques',
//         'Access study resources',
//         'Discuss with academic counselor'
//       ];
//     } else {
//       response = aiResponses.stress.general;
//       suggestions = [
//         'Explore wellness resources',
//         'Try a mindfulness exercise',
//         'Connect with the community'
//       ];
//     }

//     return {
//       id: Date.now().toString(),
//       content: response,
//       sender: 'ai',
//       timestamp: new Date(),
//       type,
//       metadata: {
//         severity: sentiment.severity,
//         category: sentiment.category,
//         suggestions
//       }
//     };
//   };

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: input.trim(),
//       sender: 'user',
//       timestamp: new Date(),
//       type: 'text',
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsTyping(true);

//     // Simulate AI thinking time
//     setTimeout(() => {
//       const aiResponse = generateAIResponse(userMessage.content);
//       setMessages(prev => [...prev, aiResponse]);
//       setIsTyping(false);

//       // Show crisis alert if needed
//       if (aiResponse.type === 'crisis') {
//         toast({
//           title: "Crisis Support Available",
//           description: "Please consider reaching out to crisis support immediately. Your safety matters.",
//           variant: "destructive",
//         });
//       }
//     }, 1000 + Math.random() * 2000); // 1-3 second delay
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const quickActions = [
//     { label: 'I feel anxious', icon: AlertTriangle, message: 'I\'m feeling really anxious right now and need some help.' },
//     { label: 'Study stress', icon: BookOpen, message: 'I\'m stressed about my studies and upcoming exams.' },
//     { label: 'Book counselor', icon: Calendar, message: 'I think I need to talk to a professional counselor.' },
//     { label: 'Breathing exercise', icon: Heart, message: 'Can you guide me through a breathing exercise?' },
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
          
//           {/* Header */}
//           <motion.div
//             className="text-center mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="flex items-center justify-center space-x-3 mb-4">
//               <motion.div
//                 className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-trust flex items-center justify-center"
//                 animate={{ scale: [1, 1.05, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 <Bot className="w-6 h-6 text-white" />
//               </motion.div>
//               <div>
//                 <h1 className="text-3xl font-bold text-foreground">AI Mental Health Assistant</h1>
//                 <p className="text-muted-foreground">24/7 support and guidance for your well-being</p>
//               </div>
//             </div>
            
//             <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
//               <Badge variant="outline" className="border-success/30 text-success">
//                 <div className="w-2 h-2 bg-success rounded-full mr-2" />
//                 Online
//               </Badge>
//               <span>Confidential • HIPAA Compliant</span>
//             </div>
//           </motion.div>

//           {/* Chat Interface */}
//           <Card className="shadow-soft border-border/50">
//             <CardHeader className="border-b border-border/50">
//               <CardTitle className="flex items-center space-x-2">
//                 <HelpCircle className="w-5 h-5 text-primary" />
//                 <span>Chat Session</span>
//               </CardTitle>
//             </CardHeader>
            
//             <CardContent className="p-0">
//               {/* Messages Area */}
//               <ScrollArea className="h-96 p-4">
//                 <div className="space-y-4">
//                   <AnimatePresence>
//                     {messages.map((message) => (
//                       <motion.div
//                         key={message.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.3 }}
//                         className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                       >
//                         <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
//                           <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
//                             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                               message.sender === 'user' 
//                                 ? 'bg-primary text-primary-foreground' 
//                                 : 'bg-trust text-trust-foreground'
//                             }`}>
//                               {message.sender === 'user' ? (
//                                 <User className="w-4 h-4" />
//                               ) : (
//                                 <Bot className="w-4 h-4" />
//                               )}
//                             </div>
                            
//                             <div className={`rounded-2xl p-3 ${
//                               message.sender === 'user'
//                                 ? 'bg-primary text-primary-foreground'
//                                 : message.type === 'crisis'
//                                 ? 'bg-destructive/10 border border-destructive/30 text-foreground'
//                                 : 'bg-muted text-foreground'
//                             }`}>
//                               <p className="text-sm leading-relaxed">{message.content}</p>
                              
//                               {/* AI Suggestions */}
//                               {message.sender === 'ai' && message.metadata?.suggestions && (
//                                 <div className="mt-3 space-y-2">
//                                   <p className="text-xs opacity-70">Quick actions:</p>
//                                   {message.metadata.suggestions.map((suggestion, idx) => (
//                                     <Button
//                                       key={idx}
//                                       variant="outline"
//                                       size="sm"
//                                       className="mr-2 mb-1 text-xs"
//                                       onClick={() => setInput(suggestion)}
//                                     >
//                                       <Lightbulb className="w-3 h-3 mr-1" />
//                                       {suggestion}
//                                     </Button>
//                                   ))}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
                          
//                           <p className={`text-xs text-muted-foreground mt-1 ${
//                             message.sender === 'user' ? 'text-right' : 'text-left ml-10'
//                           }`}>
//                             {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                           </p>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
                  
//                   {/* Typing Indicator */}
//                   {isTyping && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex items-center space-x-2"
//                     >
//                       <div className="w-8 h-8 rounded-full bg-trust text-trust-foreground flex items-center justify-center">
//                         <Bot className="w-4 h-4" />
//                       </div>
//                       <div className="bg-muted rounded-2xl p-3">
//                         <div className="flex space-x-1">
//                           <motion.div
//                             className="w-2 h-2 bg-muted-foreground rounded-full"
//                             animate={{ scale: [1, 1.2, 1] }}
//                             transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
//                           />
//                           <motion.div
//                             className="w-2 h-2 bg-muted-foreground rounded-full"
//                             animate={{ scale: [1, 1.2, 1] }}
//                             transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
//                           />
//                           <motion.div
//                             className="w-2 h-2 bg-muted-foreground rounded-full"
//                             animate={{ scale: [1, 1.2, 1] }}
//                             transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
//                           />
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>
//                 <div ref={messagesEndRef} />
//               </ScrollArea>

//               {/* Quick Actions */}
//               <div className="border-t border-border/50 p-4">
//                 <p className="text-xs text-muted-foreground mb-3">Quick actions to get started:</p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {quickActions.map((action, index) => (
//                     <Button
//                       key={index}
//                       variant="outline"
//                       size="sm"
//                       onClick={() => setInput(action.message)}
//                       className="text-xs"
//                     >
//                       <action.icon className="w-3 h-3 mr-1" />
//                       {action.label}
//                     </Button>
//                   ))}
//                 </div>

//                 {/* Input Area */}
//                 <div className="flex space-x-2">
//                   <Input
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Type your message... (Press Enter to send)"
//                     className="flex-1"
//                     disabled={isTyping}
//                   />
//                   <Button 
//                     onClick={handleSendMessage}
//                     disabled={!input.trim() || isTyping}
//                     className="px-4"
//                   >
//                     <Send className="w-4 h-4" />
//                   </Button>
//                 </div>
                
//                 <p className="text-xs text-muted-foreground mt-2 text-center">
//                   This AI assistant provides supportive guidance but isn't a replacement for professional care.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
























import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Bot,
  User,
  Heart,
  AlertTriangle,
  Calendar,
  BookOpen,
  HelpCircle,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// 🌍 Backend API URL – Updated with the correct endpoint
const API_URL = "https://polo-exhibit-feet-focus.trycloudflare.com/chat";

const sendMessageToBackend = async (message: string): Promise<string> => {
  // Set up a controller to be able to cancel the request
  const controller = new AbortController();
  // Set a 2-minute (120,000 ms) timeout to prevent errors
  const timeoutId = setTimeout(() => controller.abort(), 120000);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message }),
      signal: controller.signal, // Pass the signal to the fetch request
    });

    // Clear the timeout if the request completes in time
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Server returned an error: ${res.statusText}`);
    }

    const data = await res.json();
    return data.response || "⚠️ No response from AI.";
  } catch (error: any) {
    // Clear the timeout in case of an error too
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      console.error("AI request timed out:", error);
      return "⚠️ The AI is taking too long to respond. Please try a shorter message or try again later.";
    }
    
    console.error("AI request failed:", error);
    return "⚠️ Could not connect to AI server.";
  }
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Hi! I’m your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const reply = await sendMessageToBackend(userMessage.content);

    const aiResponse: Message = {
      id: Date.now().toString(),
      content: reply,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    {
      label: "I feel anxious",
      icon: AlertTriangle,
      message: "I'm feeling really anxious right now and need some help.",
    },
    {
      label: "Study stress",
      icon: BookOpen,
      message: "I'm stressed about my studies and upcoming exams.",
    },
    {
      label: "Book counselor",
      icon: Calendar,
      message: "I think I need to talk to a professional counselor.",
    },
    {
      label: "Breathing exercise",
      icon: Heart,
      message: "Can you guide me through a breathing exercise?",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-trust flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  AI Mental Health Assistant
                </h1>
                <p className="text-muted-foreground">
                  24/7 support and guidance for your well-being
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <Badge variant="outline" className="border-success/30 text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2" />
                Online
              </Badge>
              <span>Confidential • Secure</span>
            </div>
          </motion.div>
          <Card className="shadow-soft border-border/50">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span>Chat Session</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] ${
                            message.sender === "user" ? "order-2" : "order-1"
                          }`}
                        >
                          <div
                            className={`flex items-start space-x-2 ${
                              message.sender === "user"
                                ? "flex-row-reverse space-x-reverse"
                                : ""
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-trust text-trust-foreground"
                              }`}
                            >
                              {message.sender === "user" ? (
                                <User className="w-4 h-4" />
                              ) : (
                                <Bot className="w-4 h-4" />
                              )}
                            </div>
                            <div
                              className={`rounded-2xl p-3 ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <p className="text-sm leading-relaxed">
                                {message.content}
                              </p>
                            </div>
                          </div>
                          <p
                            className={`text-xs text-muted-foreground mt-1 ${
                              message.sender === "user"
                                ? "text-right"
                                : "text-left ml-10"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-trust text-trust-foreground flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-muted rounded-2xl p-3">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-2 h-2 bg-muted-foreground rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-muted-foreground rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-muted-foreground rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
              <div className="border-t border-border/50 p-4">
                <p className="text-xs text-muted-foreground mb-3">
                  Quick actions to get started:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInput(action.message)}
                      className="text-xs"
                    >
                      <action.icon className="w-3 h-3 mr-1" />
                      {action.label}
                    </Button>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message... (Press Enter to send)"
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                    className="px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  This AI assistant provides supportive guidance but isn't a replacement for professional care.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;