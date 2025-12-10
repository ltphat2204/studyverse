'use client';

import { FormEvent, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import axios from "axios";

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Xin chào! Tôi có thể giúp gì cho bạn?', isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Focus input after answer emerges (when loading becomes false and there are messages)
  useEffect(() => {
    if (!loading && messages.length > 1 && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading, messages.length, isOpen]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    
    const currentQuestion = input;
    setInput("");
    setLoading(true);

    try {
      // Build chat history excluding the first welcome message
      const chatHistory = messages
        .slice(1) // Remove the first welcome message
        .map(msg => `${msg.isUser ? 'Học sinh' : 'Bạn'}: ${msg.text}`)
        .join('\n');
      
      // Format the request message
      const formattedMessage = `Đây là câu hỏi của học sinh: "${currentQuestion}"

Dưới đây là lịch sử trò chuyện trong phiên học tập (CHỈ để tham khảo ngữ cảnh, KHÔNG trả lời lại các câu hỏi cũ):
${chatHistory}

Lưu ý: Hãy tập trung trả lời câu hỏi hiện tại của học sinh: "${currentQuestion}". Lịch sử trên chỉ để hiểu ngữ cảnh cuộc trò chuyện, không phải để trả lời lại.`;

      const response = await axios.get(
        "https://script.google.com/macros/s/AKfycbwveizmxcCSjHsYqWwTgmc6y9XzVnsqOZ7MjY62dxc7LN7BwhYt2bSfSUiuDmDCC6MjFw/exec?message=" + encodeURIComponent(formattedMessage)
      );
      const data = response.data;
      const answerMessage = { text: data.answer, isUser: false };
      
      setMessages((prev) => [...prev, answerMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Lỗi khi lấy phản hồi", isUser: false }
      ]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating chat button with animation */}
      <motion.div
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="cursor-pointer fixed bottom-8 right-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 p-5 text-3xl text-white shadow-2xl hover:shadow-sky-300 transition-shadow z-50"
      >
        <BsChat />
        {/* Notification badge */}
        {!isOpen && messages.length > 1 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
          >
            {messages.filter(m => !m.isUser).length}
          </motion.div>
        )}
      </motion.div>

      {/* Chat window */}
      <motion.div
        initial={{ x: "140%", opacity: 0 }}
        animate={{ 
          x: isOpen ? "0%" : "140%",
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.4, type: "spring", damping: 20 }}
        className="fixed bottom-4 right-4 w-96 bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-sky-200 z-50"
        style={{ maxWidth: "calc(100vw - 2rem)" }}
      >
        {/* Header with gradient */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <span className="font-bold text-lg">Trợ lý AI</span>
              <p className="text-xs text-sky-100">Luôn sẵn sàng giúp bạn</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(false)}
            className="focus:outline-none cursor-pointer hover:bg-white/20 rounded-full p-2 transition"
          >
            <FaTimes size={20} />
          </motion.button>
        </div>
        {/* Messages area with custom scrollbar */}
        <div
          className="p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-sky-50 to-white"
          style={{ height: "calc(100vh - 250px)", maxHeight: "500px" }}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-2xl px-4 py-3 max-w-[80%] shadow-md ${
                  msg.isUser
                    ? "bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 border border-sky-100 rounded-bl-sm"
                }`}
              >
                {!msg.isUser && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">🤖</span>
                    <span className="text-xs font-semibold text-sky-600">Trợ lý AI</span>
                  </div>
                )}
                
                <p className="text-sm leading-relaxed">{msg.text}</p>
                
                <div className={`text-xs mt-1 ${msg.isUser ? "text-sky-100" : "text-gray-400"}`}>
                  {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
          
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-sky-100">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-sky-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-sky-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-sky-500 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-sky-600">Đang suy nghĩ...</span>
                </div>
              </div>
            </motion.div>
          )}
          {/* Invisible element for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>
        {/* Input area with enhanced styling */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-white border-t-2 border-sky-100 flex items-center gap-3"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi tôi bất cứ điều gì... 💬"
            disabled={loading}
            className="flex-1 p-3 bg-sky-50 border-2 border-sky-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all placeholder:text-sky-400 disabled:opacity-50"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full hover:from-sky-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
          >
            <FaPaperPlane size={18} />
          </motion.button>
        </form>

        {/* Quick suggestions */}
        {messages.length === 1 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 pb-4 bg-white"
          >
            <p className="text-xs text-gray-500 mb-2">Gợi ý câu hỏi:</p>
            <div className="flex flex-wrap gap-2">
              {["Giải thích bài toán", "Hướng dẫn học", "Mẹo ôn tập"].map((suggestion, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInput(suggestion)}
                  className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-full hover:bg-sky-200 transition"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default ChatWidget;
