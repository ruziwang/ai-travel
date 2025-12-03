import React, { useState } from 'react';
import { Search, Map, Compass, Ticket } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (route: string, params?: any) => void;
}

const categories = [
  { id: 'island', name: '海岛游', icon: '🏝️' },
  { id: 'ancient', name: '古镇', icon: '🏯' },
  { id: 'camping', name: '露营', icon: '⛺' },
  { id: 'food', name: '美食', icon: '🍜' },
  { id: 'drive', name: '自驾', icon: '🚗' },
];

const popularDestinations = [
  { id: '1', title: '京都漫步', image: 'https://picsum.photos/300/400?random=1', label: '热门' },
  { id: '2', title: '瑞士滑雪', image: 'https://picsum.photos/300/400?random=2', label: '当季' },
  { id: '3', title: '巴厘岛', image: 'https://picsum.photos/300/400?random=3', label: '推荐' },
];

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim()) {
      onNavigate('search-results', { title: searchText, query: searchText, type: 'search' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="animate-fade-in pb-24">
      {/* Header / Hero */}
      <div className="relative h-72 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-b-[40px] overflow-hidden shadow-lg">
        <img 
          src="https://picsum.photos/800/600?random=10" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent"></div>
        
        <div className="relative px-6 pt-12 pb-6 h-full flex flex-col justify-end">
          <h1 className="text-3xl font-bold text-white mb-1">探索世界</h1>
          <p className="text-blue-100 text-sm mb-6">开启您的完美旅程规划</p>
          
          <div className="bg-white/95 backdrop-blur-sm p-2 rounded-2xl shadow-lg flex items-center">
            <Search className="text-slate-400 ml-2" size={20} />
            <input 
              type="text" 
              placeholder="你想去哪里?" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm flex-1 px-3 py-2"
            />
            <button 
              onClick={handleSearch}
              className="bg-blue-500 text-white p-2 rounded-xl shadow-md active:scale-95 transition-transform"
            >
              <Compass size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">热门分类</h2>
          <span className="text-xs text-slate-400 cursor-pointer" onClick={() => onNavigate('search-results', { title: '所有分类', type: 'category' })}>查看更多</span>
        </div>
        <div className="flex justify-between space-x-2">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => onNavigate('search-results', { title: cat.name, type: 'category' })}
              className="flex flex-col items-center space-y-2 group cursor-pointer"
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl border border-slate-50 group-active:scale-90 transition-transform">
                {cat.icon}
              </div>
              <span className="text-xs text-slate-600 font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">推荐路线</h2>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide -mx-5 px-5">
          {popularDestinations.map((dest) => (
            <div 
              key={dest.id} 
              onClick={() => onNavigate('trip-detail', { tripId: dest.id })}
              className="relative flex-shrink-0 w-40 h-56 rounded-2xl overflow-hidden shadow-md group cursor-pointer active:scale-95 transition-transform"
            >
              <img src={dest.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={dest.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/30">
                <span className="text-[10px] text-white font-medium">{dest.label}</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-bold text-lg">{dest.title}</h3>
                <div className="flex items-center text-white/80 text-xs mt-1">
                   <span>5天4晚</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-5 mt-4">
        <div 
          onClick={() => onNavigate('ai', {})}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
        >
           <div className="relative z-10">
             <h3 className="font-bold text-lg mb-1">AI 智能规划</h3>
             <p className="text-indigo-100 text-xs w-2/3 mb-3">不知道去哪玩？让 AI 帮您生成个性化行程。</p>
             <button className="bg-white text-indigo-600 text-xs font-bold px-4 py-2 rounded-lg pointer-events-none">立即体验</button>
           </div>
           <Compass className="absolute -bottom-4 -right-4 text-white/10 w-32 h-32 rotate-12" />
        </div>
      </div>
    </div>
  );
};