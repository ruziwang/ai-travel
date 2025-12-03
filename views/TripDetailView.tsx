import React from 'react';
import { ChevronLeft, MapPin, Clock, Star, Calendar, Share2, Heart, CheckCircle2 } from 'lucide-react';

interface TripDetailViewProps {
  tripId: string;
  onBack: () => void;
}

export const TripDetailView: React.FC<TripDetailViewProps> = ({ tripId, onBack }) => {
  // Mock data - in a real app, fetch based on tripId
  const trip = {
    title: '京都深度漫步之旅',
    rating: 4.8,
    reviews: 124,
    location: '日本 · 京都',
    duration: '5天4晚',
    price: '¥6,800',
    description: '探索古都的宁静与繁华，体验传统的茶道文化，漫步在伏见稻荷大社的千本鸟居下，感受祗园的黄昏魅力。',
    images: [
      'https://picsum.photos/800/600?random=10',
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12'
    ],
    highlights: ['伏见稻荷大社', '清水寺', '岚山竹林', '怀石料理体验'],
    itinerary: [
      { day: 1, title: '抵达京都', desc: '接机入住酒店，自由探索锦市场美食。' },
      { day: 2, title: '古寺巡礼', desc: '清水寺 - 三年坂二年坂 - 八坂神社。' },
      { day: 3, title: '岚山风光', desc: '岚山小火车 - 竹林小径 - 渡月桥。' },
      { day: 4, title: '文化体验', desc: '茶道体验 - 祗园花见小路。' },
      { day: 5, title: '返程', desc: '购买伴手礼，前往机场。' },
    ]
  };

  return (
    <div className="bg-white min-h-screen pb-24 animate-slide-up relative z-50">
      {/* Hero Header */}
      <div className="relative h-80">
        <img src={trip.images[0]} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Navbar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center pt-8">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 active:scale-90 transition-transform"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex space-x-2">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
              <Share2 size={20} />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Title Block */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
           <div className="flex items-center space-x-1 mb-2 text-blue-200 text-sm font-medium">
             <MapPin size={14} />
             <span>{trip.location}</span>
           </div>
           <h1 className="text-3xl font-bold mb-2 shadow-sm">{trip.title}</h1>
           <div className="flex items-center space-x-4 text-sm opacity-90">
             <div className="flex items-center text-yellow-400">
               <Star size={14} fill="currentColor" className="mr-1" />
               <span className="font-bold">{trip.rating}</span>
               <span className="text-white ml-1">({trip.reviews} 评价)</span>
             </div>
             <div className="flex items-center">
               <Clock size={14} className="mr-1" />
               <span>{trip.duration}</span>
             </div>
           </div>
        </div>
      </div>

      <div className="px-6 py-6 -mt-6 bg-white rounded-t-[30px] relative">
        {/* Highlights */}
        <div className="mb-8">
           <h2 className="text-lg font-bold text-slate-800 mb-3">旅程亮点</h2>
           <div className="flex flex-wrap gap-2">
             {trip.highlights.map((tag, i) => (
               <span key={i} className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-medium">
                 {tag}
               </span>
             ))}
           </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-2">简介</h2>
          <p className="text-slate-500 text-sm leading-relaxed">{trip.description}</p>
        </div>

        {/* Itinerary Timeline */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center justify-between">
            <span>行程安排</span>
            <span className="text-blue-500 text-xs font-medium cursor-pointer">查看详细</span>
          </h2>
          <div className="space-y-6 relative pl-2">
            {/* Vertical Line */}
            <div className="absolute top-2 bottom-2 left-[15px] w-0.5 bg-slate-100"></div>

            {trip.itinerary.map((item, index) => (
               <div key={index} className="flex relative">
                 <div className="w-8 flex-shrink-0 flex flex-col items-center mr-4 z-10">
                   <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                     D{item.day}
                   </div>
                 </div>
                 <div className="flex-1 pt-1">
                   <h3 className="text-slate-800 font-bold text-sm mb-1">{item.title}</h3>
                   <p className="text-slate-400 text-xs">{item.desc}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>
        
        {/* Included */}
        <div className="mb-8 p-4 bg-slate-50 rounded-xl">
           <h2 className="text-sm font-bold text-slate-800 mb-3">包含服务</h2>
           <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center text-xs text-slate-500">
                <CheckCircle2 size={14} className="text-green-500 mr-2" /> 酒店住宿
              </div>
              <div className="flex items-center text-xs text-slate-500">
                <CheckCircle2 size={14} className="text-green-500 mr-2" /> 景点门票
              </div>
              <div className="flex items-center text-xs text-slate-500">
                <CheckCircle2 size={14} className="text-green-500 mr-2" /> 每日早餐
              </div>
              <div className="flex items-center text-xs text-slate-500">
                <CheckCircle2 size={14} className="text-green-500 mr-2" /> 导游服务
              </div>
           </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 pb-8 flex items-center justify-between shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 max-w-md mx-auto">
        <div>
          <span className="text-xs text-slate-400 block mb-1">总价</span>
          <div className="flex items-baseline">
             <span className="text-red-500 font-bold text-xl">{trip.price}</span>
             <span className="text-slate-400 text-xs ml-1">/人起</span>
          </div>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-transform">
          立即预订
        </button>
      </div>
    </div>
  );
};