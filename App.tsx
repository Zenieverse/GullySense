
import React, { useState, useEffect, useRef } from 'react';
import { Message, LocalContext } from './types';
import { getGullyResponse } from './services/geminiService';
import StatusCard from './components/StatusCard';
import { Send, MapPin, Zap, Info, Loader2 } from 'lucide-react';
import { COMMON_SLANG } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Yo macha! Kiro here. Indiranagar weather is looking a bit risky, but the scene is chill. What's up?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<LocalContext>({
    area: 'Indiranagar',
    time: '9:45 PM',
    weather: 'Light rain'
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await getGullyResponse(messages, input, context);
    
    const modelMsg: Message = {
      role: 'model',
      content: response || "Something went wrong, guru.",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4 md:p-6 text-slate-100 overflow-hidden bg-slate-950">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 tracking-tight flex items-center gap-2">
            GullySense <Zap className="text-green-500 fill-green-500" size={24} />
          </h1>
          <p className="text-slate-500 text-sm font-medium">By Kiro • Your Indiranagar Macha</p>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={() => alert("Hyperlocal knowledge base active: Indiranagar v1.0")}
                className="p-2 glass rounded-full text-slate-400 hover:text-green-400 transition-colors"
            >
                <Info size={20} />
            </button>
        </div>
      </header>

      {/* Environment Stats */}
      <StatusCard context={context} />

      {/* Main Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide pr-2"
      >
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-4 rounded-2xl ${
                m.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-none' 
                  : 'glass text-slate-200 rounded-bl-none border-l-4 border-l-emerald-500'
              } shadow-lg`}
            >
              {m.role === 'model' && (
                <div className="text-[10px] uppercase font-bold text-emerald-400 mb-1 flex items-center gap-1">
                    <Zap size={10} /> KIRO
                </div>
              )}
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{m.content}</p>
              <span className="text-[9px] opacity-50 block mt-2 text-right">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass p-4 rounded-2xl rounded-bl-none flex items-center gap-2 text-slate-400">
              <Loader2 className="animate-spin" size={16} />
              <span className="text-sm font-medium italic">Kiro is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Slang Tags */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {COMMON_SLANG.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setInput(prev => prev + (prev ? " " : "") + s.term)}
            className="flex-shrink-0 px-3 py-1.5 glass rounded-full text-xs font-semibold text-slate-300 hover:text-green-400 hover:border-green-400 transition-all border border-transparent"
          >
            #{s.term}
          </button>
        ))}
      </div>

      {/* Input Section */}
      <div className="relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Kiro about the scene..."
          className="w-full glass bg-slate-900/50 p-4 pr-16 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-xl"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl ${
            input.trim() && !loading 
            ? 'bg-emerald-500 text-white shadow-lg neon-glow scale-100' 
            : 'bg-slate-800 text-slate-500 scale-95'
          } transition-all active:scale-90`}
        >
          <Send size={20} />
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-600 mt-4 uppercase tracking-widest font-bold">
        Hyperlocal Context: Indiranagar • Bengaluru
      </p>
    </div>
  );
};

export default App;
