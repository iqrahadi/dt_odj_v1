import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, FileText, ExternalLink } from 'lucide-react';
import type { DataRequest } from '../App';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  showRequestButton?: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onSubmitRequest: (request: Omit<DataRequest, 'id' | 'status' | 'requestDate' | 'updatedDate' | 'trackingNumber' | 'timeline'>) => void;
  onOpenRequestModal: () => void;
}

const predefinedResponses: { [key: string]: string } = {
  hello: "Halo! Saya asisten Open Data Portal. Saya bisa membantu Anda:\n\n• Mencari dataset\n• Request data baru\n• Informasi tentang portal\n\nApa yang bisa saya bantu?",
  help: "Saya dapat membantu Anda dengan:\n• Mencari dataset spesifik\n• Memahami format data\n• Informasi organisasi\n• Request data yang belum tersedia\n• Navigasi portal\n\nApa yang ingin Anda ketahui?",
  datasets: "Kami memiliki lebih dari 1,247 dataset tersedia dalam berbagai kategori termasuk Kesehatan, Pendidikan, Transportasi, Ekonomi, Lingkungan, dan lainnya. Anda dapat menelusuri menggunakan filter di atas atau beritahu saya apa yang Anda cari!",
  download: "Untuk mengunduh dataset:\n1. Klik kartu dataset\n2. Pilih format yang diinginkan (CSV, JSON, dll.)\n3. Klik tombol download\n\nSebagian besar dataset tersedia dalam berbagai format untuk kemudahan Anda.",
  api: "Banyak dataset kami menawarkan akses API untuk integrasi data real-time. Cari dataset dengan label format 'API'. Dokumentasi API tersedia di halaman detail setiap dataset.",
  request: "Tentu! Untuk mengajukan permohonan dataset baru, silakan isi form permohonan resmi kami dengan mengklik tombol di bawah ini.\n\nForm ini akan membantu kami memahami kebutuhan data Anda dengan lebih baik dan memprosesnya lebih cepat.",
  default: "Terima kasih atas pertanyaan Anda! Untuk pertanyaan spesifik, silakan hubungi tim support kami atau lihat bagian FAQ. Ada yang bisa saya bantu lagi mengenai dataset kami?"
};

export function Chatbot({ isOpen, onToggle, onSubmitRequest, onOpenRequestModal }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Halo! Saya asisten Open Data Portal Anda. Bagaimana saya bisa membantu Anda hari ini?\n\nKetik 'request data' jika Anda ingin mengajukan permintaan data baru.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): { text: string; showButton?: boolean } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('request') || lowerMessage.includes('permintaan') || lowerMessage.includes('minta data') || lowerMessage.includes('ajukan') || lowerMessage.includes('permohonan')) {
      return {
        text: predefinedResponses.request,
        showButton: true
      };
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('halo') || lowerMessage.includes('hey')) {
      return { text: predefinedResponses.hello };
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('bantuan')) {
      return { text: predefinedResponses.help };
    }
    if (lowerMessage.includes('dataset') || lowerMessage.includes('data')) {
      return { text: predefinedResponses.datasets };
    }
    if (lowerMessage.includes('download') || lowerMessage.includes('unduh')) {
      return { text: predefinedResponses.download };
    }
    if (lowerMessage.includes('api') || lowerMessage.includes('integration') || lowerMessage.includes('integrasi')) {
      return { text: predefinedResponses.api };
    }
    
    return { text: predefinedResponses.default };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const response = getBotResponse(inputValue);
      const botResponse: Message = {
        id: messages.length + 2,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        showRequestButton: response.showButton
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOpenForm = () => {
    onOpenRequestModal();
    
    const confirmationMessage: Message = {
      id: messages.length + 1,
      text: 'Form permohonan dataset telah dibuka. Silakan isi semua informasi yang diperlukan dan kirimkan permohonan Anda.',
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, confirmationMessage]);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 flex items-center justify-center z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div>Data Assistant</div>
                <div className="text-xs text-green-100">Online</div>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' ? 'bg-gray-200' : 'bg-green-100'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Bot className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <div className={`max-w-[75%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-900 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                  
                  {/* Request Dataset Button */}
                  {message.showRequestButton && message.sender === 'bot' && (
                    <button
                      onClick={handleOpenForm}
                      className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2 self-start"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">Isi Form Permohonan</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                  
                  <span className="text-xs text-gray-500 px-1">
                    {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesan Anda..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
