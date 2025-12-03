import React from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { TripCard } from '../components/TripCard';
import { Trip } from '../types';

interface SearchResultsViewProps {
  title: string;
  type: 'search' | 'category';
  query?: string;
  onBack: () => void;
  onNavigate: (route: string, params?: any) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({ title, query, onBack, onNavigate }) => {
  // Mock results based on query or category
  const results: Trip[] = [
    {
      id: '101',
      title: '京都古韵3日游',
      subtitle: '深度体验日本传统文化',
      date: '推荐行程',
      days: 3,
      image: 'https://picsum.photos/300/300?random=101',
      status: 'planned'
    },
    {
      id: '102',
      title: '北海道滑雪之旅',
      subtitle: '粉雪天堂与温泉',
      date: '冬季热门',
      days: 5,
      image: 'https://picsum.photos/300/300?random=102',
      status: 'planned'
    },
    {
      id: '103',
      title: '冲绳海岛度假',
      subtitle: '阳光沙滩与潜水',
      date: '全年适宜',
      days: 4,
      image: 'https://picsum.photos/300/300?random=103',
      status: 'planned'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-4 pb-6 animate-fade-in z-40 relative">
      <div className="px-5 mb-4 flex items-center">
        <button 
          onClick={onBack}
          className="mr-3 p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center shadow-sm">
           <Search size={16} className="text-slate-400 mr-2" />
           <span className="text-sm text-slate-700 font-medium">{query || title}</span>
        </div>
      </div>

      <div className="px-5 mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          "{title}" 相关结果
        </h2>
        <p className="text-xs text-slate-400 mt-1">找到 {results.length} 条精彩行程</p>
      </div>

      <div className="px-5 space-y-4">
        {results.map(trip => (
          <div key={trip.id} onClick={() => onNavigate('trip-detail', { tripId: trip.id })}>
             <TripCard trip={trip} />
          </div>
        ))}
      </div>
    </div>
  );
};