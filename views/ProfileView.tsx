import React from 'react';
import { Settings, Bookmark, Heart, Map, ChevronRight, LogOut, Award } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Completed', value: 8 },
  { name: 'Planned', value: 3 },
  { name: 'Bucket List', value: 12 },
];
const COLORS = ['#0ea5e9', '#38bdf8', '#bae6fd'];

export const ProfileView: React.FC = () => {
  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white pt-12 pb-16 px-6 rounded-b-[40px] shadow-lg relative">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-xl font-medium opacity-90">个人中心</h1>
          <Settings className="opacity-80 hover:opacity-100 cursor-pointer" size={20} />
        </div>
        
        <div className="flex items-center space-x-4 z-10 relative">
          <div className="w-20 h-20 rounded-full border-4 border-white/30 shadow-xl overflow-hidden">
            <img src="https://picsum.photos/200/200?random=88" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">King</h2>
            <p className="text-blue-100 text-sm">风在这里</p>
            <div className="mt-2 flex items-center space-x-2">
               <span className="bg-white/20 px-2 py-0.5 rounded-md text-xs backdrop-blur-sm">Lv. 5 旅行家</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section Overlay */}
      <div className="mx-5 -mt-10 bg-white rounded-2xl shadow-lg p-5 flex justify-between items-center z-20 relative border border-slate-50">
         <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-700 mb-2">旅行统计</h3>
            <div className="space-y-2">
               <div className="flex items-center text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  已完成: 8
               </div>
               <div className="flex items-center text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-sky-400 mr-2"></span>
                  计划中: 3
               </div>
            </div>
         </div>
         <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Menu Options */}
      <div className="px-5 mt-6 space-y-4">
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-50 active:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-50 text-yellow-500 rounded-xl">
                <Bookmark size={20} />
              </div>
              <span className="text-slate-700 font-medium text-sm">我的收藏</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </div>
          
          <div className="flex items-center justify-between p-4 border-b border-slate-50 active:bg-slate-50 transition-colors cursor-pointer">
             <div className="flex items-center space-x-3">
              <div className="p-2 bg-pink-50 text-pink-500 rounded-xl">
                <Heart size={20} />
              </div>
              <span className="text-slate-700 font-medium text-sm">喜欢的目的地</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </div>

           <div className="flex items-center justify-between p-4 active:bg-slate-50 transition-colors cursor-pointer">
             <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 text-green-500 rounded-xl">
                <Map size={20} />
              </div>
              <span className="text-slate-700 font-medium text-sm">足迹地图</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex items-center justify-between active:bg-slate-50 transition-colors cursor-pointer">
           <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl">
                <Award size={20} />
              </div>
              <span className="text-slate-700 font-medium text-sm">成为会员</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-slate-400 mr-1">更多权益</span>
              <ChevronRight size={16} className="text-slate-300" />
            </div>
        </div>

        <button className="w-full bg-white text-red-500 text-sm font-medium py-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center space-x-2 active:bg-red-50 transition-colors">
          <LogOut size={18} />
          <span>退出登录</span>
        </button>

      </div>
    </div>
  );
};
