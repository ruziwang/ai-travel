import React from 'react';
import { Trip } from '../types';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transform duration-100">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
             <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
               trip.status === 'planned' ? 'bg-blue-100 text-blue-600' :
               trip.status === 'ongoing' ? 'bg-green-100 text-green-600' :
               'bg-slate-100 text-slate-500'
             }`}>
               {trip.status === 'planned' ? '计划中' : trip.status === 'ongoing' ? '进行中' : '已完成'}
             </span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">{trip.title}</h3>
          <p className="text-sm text-slate-500 mb-3">{trip.subtitle}</p>
          
          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{trip.days} 天</span>
            </div>
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              <span>{trip.date}</span>
            </div>
          </div>
        </div>
        
        <div className="relative w-20 h-20 rounded-xl overflow-hidden ml-3 shadow-inner">
           <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
        <span className="text-xs text-blue-500 font-medium">查看详情</span>
        <ChevronRight size={16} className="text-slate-300" />
      </div>
    </div>
  );
};
