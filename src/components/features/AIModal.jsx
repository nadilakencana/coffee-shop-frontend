import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getRecommendation } from '../../api/api';

const AIModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setConversation(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getRecommendation(input);
      const aiMessage = { sender: 'ai', text: response.recommendation };
      setConversation(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { sender: 'ai', text: 'Sorry, I am having trouble connecting. Please try again later.' };
      setConversation(prev => [...prev, errorMessage]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#8d63418e] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FDF7F3] rounded-2xl shadow-xl w-full max-w-md h-[70vh] flex flex-col">
        <header className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg text-[#4A2C2A]">Barista AI</h2>
          <button onClick={onClose} className="font-bold text-2xl">&times;</button>
        </header>
        <main className="flex-1 p-4 overflow-y-auto space-y-4">
          {conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-[#A85B4D] text-white' : 'bg-white text-[#A85B4D]'}`}>
                 <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && <p className="text-center">Barista AI is thinking...</p>}
        </main>
        <footer className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about the menu..."
              className="flex-1 bg-white px-4 py-2 text-[#A85B4D] border rounded-full focus:outline-none focus:ring-2 focus:ring-[#A85B4D]"
            />
            <button type="submit" className="px-6 py-2 bg-[#A85B4D] text-white rounded-full font-semibold">Send</button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default AIModal;