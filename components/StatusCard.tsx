
import React from 'react';
import { LocalContext } from '../types';
import { MapPin, Clock, CloudRain, Sun, CloudLightning, Cloud } from 'lucide-react';

interface StatusCardProps {
  context: LocalContext;
  onUpdate: (updates: Partial<LocalContext>) => void;
}

const StatusCard: React.FC<StatusCardProps> = ({ context, onUpdate }) => {
  const toggleWeather = () => {
    const weathers = ['Clear', 'Light rain', 'Heavy rain', 'Cloudy'];
    const nextIndex = (weathers.indexOf(context.weather) + 1) % weathers.length;
    onUpdate({ weather: weathers[nextIndex] });
  };

  const toggleLocation = () => {
    const areas = ['Indiranagar', 'MG Road', 'Koramangala', 'Whitefield', 'HSR Layout'];
    const nextIndex = (areas.indexOf(context.area) + 1) % areas.length;
    onUpdate({ area: areas[nextIndex] });
  };

  const getWeatherIcon = () => {
    switch (context.weather) {
      case 'Heavy rain': return <CloudLightning size={16} className="text-indigo-400" />;
      case 'Light rain': return <CloudRain size={16} className="text-blue-400" />;
      case 'Clear': return <Sun size={16} className="text-orange-400" />;
      case 'Cloudy': return <Cloud size={16} className="text-slate-400" />;
      default: return <Cloud size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2.5 w-full max-w-2xl mx-auto mb-5">
      <button 
        onClick={toggleLocation}
        className="glass p-3 rounded-2xl flex flex-col items-center justify-center hover:bg-emerald-500/5 transition-all border-emerald-500/10 group active:scale-95 shadow-lg"
      >
        <MapPin size={16} className="mb-1.5 text-emerald-400 group-hover:scale-110 transition-transform" />
        <span className="text-[9px] uppercase font-black text-slate-500 tracking-tighter mb-0.5">Location</span>
        <span className="text-[11px] font-bold truncate w-full text-center text-slate-100">{context.area}</span>
      </button>

      <div className="glass p-3 rounded-2xl flex flex-col items-center justify-center border-blue-500/10 shadow-lg select-none">
        <Clock size={16} className="mb-1.5 text-blue-400" />
        <span className="text-[9px] uppercase font-black text-slate-500 tracking-tighter mb-0.5">Ooru Time</span>
        <span className="text-[11px] font-bold text-slate-100">{context.time}</span>
      </div>

      <button 
        onClick={toggleWeather}
        className="glass p-3 rounded-2xl flex flex-col items-center justify-center hover:bg-indigo-500/5 transition-all border-indigo-500/10 group active:scale-95 shadow-lg"
      >
        <div className="mb-1.5 group-hover:scale-110 transition-transform">{getWeatherIcon()}</div>
        <span className="text-[9px] uppercase font-black text-slate-500 tracking-tighter mb-0.5">Weather</span>
        <span className="text-[11px] font-bold truncate w-full text-center text-slate-100">{context.weather}</span>
      </button>
    </div>
  );
};

export default StatusCard;
