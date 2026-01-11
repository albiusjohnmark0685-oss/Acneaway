import { Camera, BookOpen, ClipboardList, Settings } from 'lucide-react';
import { Screen } from '../App';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const tabs = [
    { id: 'scan' as Screen, icon: Camera, label: 'Scan' },
    { id: 'home' as Screen, icon: BookOpen, label: 'Tips' },
    { id: 'log' as Screen, icon: ClipboardList, label: 'Log' },
    { id: 'home' as Screen, icon: Settings, label: 'Profile' }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-100 px-6 flex items-center justify-around">
      {tabs.map((tab, index) => {
        const isActive = tab.id === currentScreen || (currentScreen === 'pre-scan' && tab.id === 'scan') || (currentScreen === 'results' && tab.id === 'scan');
        const Icon = tab.icon;
        
        return (
          <button
            key={index}
            onClick={() => onNavigate(tab.id)}
            className="flex flex-col items-center gap-1 relative"
          >
            <Icon 
              className={`w-6 h-6 transition-colors ${
                isActive ? 'text-pink-500' : 'text-gray-400'
              }`}
              strokeWidth={2}
            />
            <span className="text-[10px] text-gray-500">{tab.label}</span>
            {isActive && (
              <div className="absolute -bottom-3 w-8 h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}