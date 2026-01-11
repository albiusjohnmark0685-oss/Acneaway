import { Settings, Camera, Sparkles, Droplet, Leaf, Brain } from 'lucide-react';
import { Screen } from '../App';
import { BottomNavigation } from './BottomNavigation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState('All');

  const categories = [
    { name: 'All', icon: '🌸' },
    { name: 'Face Acne', icon: '💆‍♀️' },
    { name: 'Body Acne', icon: '💪' },
    { name: 'Blackheads', icon: '⚫' },
    { name: 'Whiteheads', icon: '⚪' },
    { name: 'Sensitive Skin', icon: '🧴' },
    { name: 'Treatments', icon: '💊' }
  ];

  const featuredCards = [
    { icon: Droplet, title: 'Top 3 Hydrating Ingredients for Acne Skin', color: 'from-blue-400 to-blue-500', screen: 'hydrating' as Screen },
    { icon: Leaf, title: 'AI-Approved Natural Treatments', color: 'from-green-400 to-green-500', screen: 'natural' as Screen },
    { icon: Brain, title: 'How Our Scanner Works', color: 'from-purple-400 to-purple-500', screen: 'how-it-works' as Screen }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-pink-50 to-white">
      {/* Top Bar */}
      <div className="px-6 pt-14 pb-4 bg-gradient-to-b from-pink-100/50 to-transparent">
        <div className="flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            💖 ACNE AWAY 2.5
          </h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-50 transition-colors">
            <Settings className="w-6 h-6 text-pink-500" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-white via-pink-50 to-blue-50 rounded-3xl p-6 shadow-xl shadow-pink-100/50 mb-6 border border-pink-100">
          <h2 className="text-gray-900 mb-2">AI Skin Analysis & Smart Tracker</h2>
          <p className="text-gray-600 mb-4">
            Upload your photo, detect acne type, get personalized treatment, and monitor your skincare progress.
          </p>
          
          {/* Hero Image */}
          <div className="mb-4 rounded-2xl overflow-hidden shadow-lg">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1620334267407-30621bae1d7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNraW5jYXJlJTIwZmFjZSUyMGNsZWFufGVufDF8fHx8MTc2NjE0NzI5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="AI Skin Analysis"
              className="w-full h-48 object-cover"
            />
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => onNavigate('pre-scan')}
              className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-2xl shadow-lg shadow-pink-400/50 hover:shadow-xl hover:shadow-pink-500/50 transition-all active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Analysis
              </span>
            </button>
            <button 
              onClick={() => onNavigate('how-it-works')}
              className="px-5 py-4 rounded-2xl border-2 border-pink-400 text-pink-600 hover:bg-pink-50 transition-colors active:scale-95"
            >
              <span className="text-sm">How It Works</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-5 relative">
          <input
            type="text"
            placeholder="Find by acne type or ingredient…"
            className="w-full px-5 py-3.5 rounded-2xl bg-white shadow-md shadow-pink-100/50 border border-pink-100 text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <Camera className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeTab === cat.name
                  ? 'bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg shadow-pink-300/50'
                  : 'bg-white text-gray-600 shadow-md shadow-pink-100/30 hover:shadow-lg'
              }`}
            >
              <span>{cat.icon}</span>
              <span className="text-sm">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Featured Cards */}
        <div className="space-y-4">
          {featuredCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 shadow-md shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/50 transition-shadow cursor-pointer active:scale-[0.98]"
                onClick={() => onNavigate(card.screen)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <p className="text-gray-700 flex-1 pt-2">{card.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="home" onNavigate={onNavigate} />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}