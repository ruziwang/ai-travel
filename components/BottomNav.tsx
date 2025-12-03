import React from 'react';
import { Home, Calendar, Bot, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'itinerary', label: '行程', icon: Calendar },
    { id: 'ai', label: 'AI助手', icon: Bot, isSpecial: true },
    { id: 'profile', label: '我的', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-2 pb-5 z-50 flex justify-between items-end shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center relative transition-all duration-300 ${
              isActive ? 'text-blue-500 -translate-y-1' : 'text-slate-400'
            }`}
          >
            {item.isSpecial ? (
              <div className={`p-3 rounded-2xl mb-1 shadow-lg transition-all ${
                isActive ? 'bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-blue-200' : 'bg-slate-50 text-slate-400'
              }`}>
                <Icon size={24} />
              </div>
            ) : (
              <div className="p-1 mb-0.5">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
            )}
            <span className={`text-[10px] font-medium ${isActive ? 'text-blue-500' : 'text-slate-400'}`}>
              {item.label}
            </span>
            {isActive && !item.isSpecial && (
              <span className="absolute -bottom-2 w-1 h-1 bg-blue-500 rounded-full"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
