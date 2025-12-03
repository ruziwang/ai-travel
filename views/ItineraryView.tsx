import React, { useState } from 'react';
import { TripCard } from '../components/TripCard';
import { Trip } from '../types';
import { Plus } from 'lucide-react';

interface ItineraryViewProps {
  onNavigate: (route: string, params?: any) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingTrips: Trip[] = [
    {
      id: '1',
      title: '东北3日游 (副本)',
      subtitle: '长白山旅行计划',
      date: '2023-12-20',
      days: 3,
      image: 'https://picsum.photos/200/200?random=20',
      status: 'planned'
    },
    {
      id: '2',
      title: '东京一日游',
      subtitle: '东京购物与美食',
      date: '2024-01-15',
      days: 1,
      image: 'https://picsum.photos/200/200?random=21',
      status: 'planned'
    }
  ];

  const pastTrips: Trip[] = [
     {
      id: '3',
      title: '云南大理深度游',
      subtitle: '苍山洱海之旅',
      date: '2023-05-10',
      days: 5,
      image: 'https://picsum.photos/200/200?random=22',
      status: 'completed'
    }
  ];

  return (
    <div className="pt-12 px-5 pb-24 h-full flex flex-col bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">我的行程</h1>
        <button 
          onClick={() => onNavigate('search-results', { title: '新建行程', type: 'search' })}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center shadow-md active:scale-95 transition-all"
        >
          <Plus size={16} className="mr-1" />
          新建行程
        </button>
      </div>

      <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex mb-6">
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'upcoming' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          计划中
        </button>
        <button 
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'past' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          已完成
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
        {(activeTab === 'upcoming' ? upcomingTrips : pastTrips).map(trip => (
          <div key={trip.id} onClick={() => onNavigate('trip-detail', { tripId: trip.id })}>
             <TripCard trip={trip} />
          </div>
        ))}
        
        {upcomingTrips.length === 0 && activeTab === 'upcoming' && (
          <div className="text-center py-20 text-slate-400">
            <p>暂无计划行程</p>
          </div>
        )}
      </div>
    </div>
  );
};