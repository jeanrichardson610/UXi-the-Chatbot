import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

export default function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4002/api/bot/v1/message", { text: input });
      setMessages(prev => [
        ...prev,
        { text: res.data.userMessage, sender: 'user' },
        { text: res.data.botMessage, sender: 'bot' }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { text: "Network error. Please try again.", sender: 'bot' }
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className='flex flex-col min-h-screen bg-[#0d0d0d] text-white'>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full border-b border-gray-800 bg-[#0d0d0d] z-10">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500 text-4xl font-bold">UXi</h1>
          <FaUserCircle size={30} className="cursor-pointer" />
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto pt-20 pb-24 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-4 flex flex-col space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 text-xl">
              ✌️ Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500 font-semibold text-3xl">UXi</span>. Ask me anything!
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded-xl max-w-[75%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white self-end'
                      : 'bg-gray-800 text-gray-100 self-start'
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl max-w-[60%] self-start">
                  Bot is typing...
                </div>
              )}

              <div ref={endRef} />
            </>
          )}
        </div>
      </main>

      {/* Input & Footer */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-800 bg-[#0d0d0d] z-10">
        <div className="max-w-4xl mx-auto flex justify-center px-4 py-3">
          <div className="w-full flex bg-gray-900 rounded-full px-4 py-2 shadow-lg">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2"
              placeholder="Ask UXi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-full text-white font-medium transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
