
import React from 'react';
import { LocalContext } from '../types';
import { MapPin, Clock, CloudRain } from 'lucide-react';

const StatusCard: React.FC<{ context: LocalContext }> = ({ context }) => {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-2xl mx-auto mb-6">
      <div className="glass p-3 rounded-2xl flex flex-col items-center justify-center text-green-400">
        <MapPin size={20} className="mb-1" />
        <span className="text-[10px] uppercase font-bold text-slate-400">Location</span>
        <span className="text-sm font-semibold">{context.area}</span>
      </div>
      <div className="glass p-3 rounded-2xl flex flex-col items-center justify-center text-blue-400">
        <Clock size={20} className="mb-1" />
        <span className="text-[10px] uppercase font-bold text-slate-400">Time</span>
        <span className="text-sm font-semibold">{context.time}</span>
      </div>
      <div className="glass p-3 rounded-2xl flex flex-col items-center justify-center text-indigo-400">
        <CloudRain size={20} className="mb-1" />
        <span className="text-[10px] uppercase font-bold text-slate-400">Weather</span>
        <span className="text-sm font-semibold">{context.weather}</span>
      </div>
    </div>
  );
};

export default StatusCard;
