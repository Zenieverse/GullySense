
import React, { useState, useEffect, useRef } from 'react';
import { Message, LocalContext } from './types';
import { getGullyResponse, getKiroVoice } from './services/geminiService';
import StatusCard from './components/StatusCard';
import { 
  Send, Zap, Loader2, Utensils, Car, MessageCircle, 
  ChevronRight, Sparkles, Volume2, Trash2, VolumeX
} from 'lucide-react';
import { COMMON_SLANG } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Yo macha! Kiro here. What's the scene today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [context, setContext] = useState<LocalContext>({
    area: 'Indiranagar',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    weather: 'Cloudy'
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioBufferSourceNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setContext(prev => ({
        ...prev,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleSend = async (customInput?: string) => {
    const text = customInput || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await getGullyResponse(messages, text, context);
      
      const modelMsg: Message = {
        role: 'model',
        content: response || "Arrey guru, the network is doing 'full scene'. Try again?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'model',
        content: "Server problem, macha. One minute adjust maadi.",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const stopVoice = () => {
    if (audioRef.current) {
      audioRef.current.stop();
      audioRef.current = null;
    }
    setPlayingAudio(null);
  };

  const playVoice = async (text: string, msgIndex: number) => {
    const audioKey = `msg-${msgIndex}`;
    if (playingAudio === audioKey) {
      stopVoice();
      return;
    }
    stopVoice();
    setPlayingAudio(audioKey);
    
    const base64 = await getKiroVoice(text);
    if (base64) {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioCtxRef.current;
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
        
        const dataInt16 = new Int16Array(bytes.buffer);
        const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => {
          setPlayingAudio(prev => prev === audioKey ? null : prev);
        };
        audioRef.current = source;
        source.start();
      } catch (err) {
        console.error("Audio playback error:", err);
        setPlayingAudio(null);
      }
    } else {
      setPlayingAudio(null);
    }
  };

  const clearChat = () => {
    if (window.confirm("Clear chat?")) {
      setMessages([{
        role: 'model',
        content: "New scene! What's up?",
        timestamp: new Date()
      }]);
    }
  };

  const quickPrompts = [
    { label: "Food Check", icon: <Utensils size={14} />, query: "What's a bombat place for Gobi Manchurian nearby?" },
    { label: "Traffic Truth", icon: <Car size={14} />, query: "How's the traffic towards MG Road?" },
    { label: "Slang Lesson", icon: <MessageCircle size={14} />, query: "Explain 'Full Tight' with an example." },
  ];

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto text-slate-100 overflow-hidden bg-slate-950 border-x border-slate-900 shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-slate-950 to-slate-950 pointer-events-none"></div>
      
      <header className="p-4 md:px-6 relative z-10 border-b border-slate-900/50 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <Zap className="text-emerald-400" size={20} />
             <h1 className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-br from-emerald-400 to-green-600 tracking-tighter">GULLYSENSE</h1>
          </div>
          <button 
            onClick={clearChat}
            className="p-2 glass rounded-lg text-slate-500 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <StatusCard context={context} onUpdate={(u) => setContext(p => ({...p, ...u}))} />
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 scrollbar-hide relative z-10"
      >
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm border border-slate-900 shadow-lg ${
                m.role === 'model' ? 'bg-emerald-600' : 'bg-slate-800'
            }`}>
                {m.role === 'model' ? '😎' : '👤'}
            </div>
            
            <div className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
              <div 
                className={`p-3 relative shadow-lg ${
                  m.role === 'user' 
                    ? 'bg-emerald-700 text-white rounded-xl rounded-tr-none' 
                    : 'glass text-slate-200 rounded-xl rounded-tl-none border-l-2 border-emerald-500'
                }`}
              >
                {m.role === 'model' && (
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[8px] font-black text-emerald-400 tracking-widest">KIRO</span>
                    <button 
                      onClick={() => playVoice(m.content, i)}
                      className={`p-1 transition-colors ${playingAudio === `msg-${i}` ? 'text-emerald-400' : 'text-slate-500 hover:text-emerald-400'}`}
                    >
                      {playingAudio === `msg-${i}` ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{m.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-900 animate-pulse" />
             <div className="glass p-3 rounded-xl rounded-tl-none flex items-center gap-2">
                <Loader2 className="animate-spin text-emerald-500" size={12} />
                <span className="text-[10px] text-emerald-500/70 uppercase font-bold">Scanning...</span>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 pt-2 bg-slate-950/50 backdrop-blur-md relative z-10 border-t border-slate-900/50">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.query)}
              className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-[10px] font-bold text-slate-400 hover:text-emerald-400 border-emerald-500/5"
            >
              {p.icon}
              {p.label}
            </button>
          ))}
          <button
            onClick={() => {
              const s = COMMON_SLANG[Math.floor(Math.random() * COMMON_SLANG.length)];
              handleSend(`Macha, explain '${s.term}'`);
            }}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-[10px] font-bold text-indigo-400 border-indigo-500/5"
          >
            <Sparkles size={12} />
            Slang
          </button>
        </div>

        <div className="relative">
          <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="En macha, what's the scene?"
              className="w-full bg-slate-900/80 border border-slate-800 p-3.5 pr-12 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
          />
          <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                  input.trim() && !loading ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-700'
              }`}
          >
              <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
