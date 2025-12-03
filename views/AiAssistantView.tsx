import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Trash2, HelpCircle, X } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const AiAssistantView: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '你好！我是你的 AI 旅行助手。你可以问我关于目的地的建议、行程规划或者旅行小贴士。你想去哪里玩？🌍',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await sendMessageToGemini(userMsg.text, history);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
       // Error handled in service, but we can add UI feedback here
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: '对话已清空。有什么新计划吗？✨',
        timestamp: new Date()
      }
    ]);
  };

  const startTutorial = () => {
    setTutorialStep(0);
    setShowTutorial(true);
  };

  const suggestions = [
    "云南最佳旅游时间?",
    "制定一个东京3日游计划",
    "国内有哪些必去的景点?",
    "海边度假推荐"
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 relative">
      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="fixed inset-0 z-[60] flex flex-col">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowTutorial(false)} />

          {/* Tutorial Step 0: Welcome */}
          {tutorialStep === 0 && (
            <div className="m-auto relative z-10 w-4/5 max-w-sm bg-white p-6 rounded-3xl shadow-2xl animate-slide-up">
              <button onClick={() => setShowTutorial(false)} className="absolute top-4 right-4 text-slate-300 hover:text-slate-500">
                <X size={20} />
              </button>
              <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto shadow-inner">👋</div>
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">欢迎使用 AI 助手</h3>
              <p className="text-slate-500 text-center mb-6 text-sm leading-relaxed">
                我是您的私人旅行规划师。<br/>我可以帮您制定行程、查找攻略、推荐美食，甚至计算预算。
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); setTutorialStep(1); }}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
              >
                下一步
              </button>
            </div>
          )}

          {/* Tutorial Step 1: Input Area Guide */}
          {tutorialStep === 1 && (
            <div className="mt-auto mb-[90px] mx-4 relative z-10 bg-white p-5 rounded-3xl shadow-2xl animate-slide-up">
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">在这里提问</h3>
              <p className="text-slate-500 text-sm mb-4">
                在下方输入框告诉我想去哪里，或者想要什么样的旅行体验。例如："帮我计划一个适合亲子游的海岛行程"。
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={(e) => { e.stopPropagation(); setTutorialStep(0); }}
                  className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl font-medium text-sm hover:bg-slate-200"
                >
                  上一步
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setTutorialStep(2); }}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-xl font-bold text-sm shadow-md hover:bg-blue-600"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {/* Tutorial Step 2: Suggestions Guide */}
          {tutorialStep === 2 && (
            <div className="mt-32 mx-4 relative z-10 bg-white p-5 rounded-3xl shadow-2xl animate-fade-in">
              <div className="absolute -top-2 left-8 w-4 h-4 bg-white rotate-45"></div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">快捷灵感</h3>
              <p className="text-slate-500 text-sm mb-4">
                不知道怎么开始？点击屏幕上的快捷建议气泡，我会立即为您提供热门旅行方案。
              </p>
              <div className="flex space-x-3">
                 <button
                  onClick={(e) => { e.stopPropagation(); setTutorialStep(1); }}
                  className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl font-medium text-sm hover:bg-slate-200"
                >
                  上一步
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowTutorial(false); setTutorialStep(0); }}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
                >
                  开始体验
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="bg-white px-5 py-4 border-b border-slate-100 flex justify-between items-center shadow-sm z-10 sticky top-0">
        <div className="flex items-center space-x-2">
           <div className="p-2 bg-blue-100 rounded-full text-blue-600">
             <Bot size={20} />
           </div>
           <div>
             <h1 className="text-lg font-bold text-slate-800">AI 旅行助手</h1>
             <div className="flex items-center">
               <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
               <span className="text-xs text-slate-400">在线</span>
             </div>
           </div>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={startTutorial}
            className="text-slate-400 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-50"
            title="使用指南"
          >
            <HelpCircle size={20} />
          </button>
          <button 
            onClick={clearChat} 
            className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-50"
            title="清空对话"
          >
            <Trash2 size={19} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-5 pb-24 scrollbar-hide">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex mb-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 shadow-sm mt-1">
                AI
              </div>
            )}
            
            <div 
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
              }`}
            >
              {msg.text}
              <div className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-300'}`}>
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 ml-2 flex-shrink-0 mt-1 overflow-hidden">
                 <img src="https://picsum.photos/100/100?random=88" alt="User" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start mb-6 animate-pulse">
             <div className="w-8 h-8 rounded-full bg-slate-200 mr-2"></div>
             <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100">
               <div className="flex space-x-1">
                 <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                 <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                 <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
               </div>
             </div>
          </div>
        )}

        {/* Suggestions Grid */}
        {messages.length === 1 && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {suggestions.map((s, i) => (
              <button 
                key={i}
                onClick={() => setInput(s)}
                className="text-xs bg-white border border-blue-100 text-blue-600 p-3 rounded-xl text-left hover:bg-blue-50 transition-colors shadow-sm active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-[70px] left-0 right-0 bg-white/90 backdrop-blur-md p-3 border-t border-slate-100 max-w-md mx-auto">
        <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-2 border focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <Sparkles className="text-blue-400 mr-2" size={18} />
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入你的问题..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 py-2"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-xl transition-all ${
              input.trim() && !isLoading 
                ? 'bg-blue-500 text-white shadow-md active:scale-90' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};