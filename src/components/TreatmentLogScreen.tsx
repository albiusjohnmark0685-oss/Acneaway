import { ChevronLeft, Plus, Calendar, CheckCircle, AlertCircle, Clock, Droplets, Sun, Moon } from 'lucide-react';
import { Screen } from '../App';
import { BottomNavigation } from './BottomNavigation';
import { useState } from 'react';

interface TreatmentLogScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface LogEntry {
  date: string;
  time: string;
  routine: 'morning' | 'evening';
  products: {
    type: string;
    name: string;
    applied: boolean;
  }[];
  notes: string;
  skinCondition: 'improved' | 'same' | 'worse';
}

export function TreatmentLogScreen({ onNavigate }: TreatmentLogScreenProps) {
  const [logs, setLogs] = useState<LogEntry[]>([
    { 
      date: 'Dec 19, 2024',
      time: '7:30 PM',
      routine: 'evening',
      products: [
        { type: 'Cleanser', name: 'CeraVe Foaming Cleanser', applied: true },
        { type: 'Treatment', name: 'The Ordinary Niacinamide 10%', applied: true },
        { type: 'Treatment', name: 'Differin Gel 0.1%', applied: true },
        { type: 'Moisturizer', name: 'CeraVe PM Lotion', applied: true }
      ],
      notes: 'Skin feels less oily today',
      skinCondition: 'improved'
    },
    { 
      date: 'Dec 19, 2024',
      time: '8:00 AM',
      routine: 'morning',
      products: [
        { type: 'Cleanser', name: 'CeraVe Foaming Cleanser', applied: true },
        { type: 'Treatment', name: 'Vitamin C Serum 15%', applied: true },
        { type: 'Moisturizer', name: 'Neutrogena Hydro Boost', applied: true },
        { type: 'Sunscreen', name: 'La Roche-Posay SPF 50', applied: true }
      ],
      notes: 'Morning routine completed',
      skinCondition: 'same'
    },
    { 
      date: 'Dec 18, 2024',
      time: '9:15 PM',
      routine: 'evening',
      products: [
        { type: 'Cleanser', name: 'CeraVe Foaming Cleanser', applied: true },
        { type: 'Treatment', name: 'Salicylic Acid 2%', applied: true },
        { type: 'Treatment', name: 'Azelaic Acid 10%', applied: false },
        { type: 'Moisturizer', name: 'CeraVe PM Lotion', applied: true }
      ],
      notes: 'Skipped azelaic acid - skin felt sensitive',
      skinCondition: 'same'
    },
    { 
      date: 'Dec 18, 2024',
      time: '7:45 AM',
      routine: 'morning',
      products: [
        { type: 'Cleanser', name: 'CeraVe Foaming Cleanser', applied: true },
        { type: 'Treatment', name: 'Niacinamide 10%', applied: true },
        { type: 'Moisturizer', name: 'Neutrogena Hydro Boost', applied: true },
        { type: 'Sunscreen', name: 'La Roche-Posay SPF 50', applied: true }
      ],
      notes: 'Good skin day!',
      skinCondition: 'improved'
    },
    { 
      date: 'Dec 17, 2024',
      time: '10:00 PM',
      routine: 'evening',
      products: [
        { type: 'Cleanser', name: 'CeraVe Foaming Cleanser', applied: true },
        { type: 'Treatment', name: 'Benzoyl Peroxide 2.5%', applied: true },
        { type: 'Moisturizer', name: 'CeraVe PM Lotion', applied: true }
      ],
      notes: 'Noticed new breakout on chin',
      skinCondition: 'worse'
    }
  ]);

  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    routine: 'morning' as 'morning' | 'evening',
    products: [
      { type: 'Cleanser', name: '', applied: true },
      { type: 'Treatment', name: '', applied: true },
      { type: 'Moisturizer', name: '', applied: true },
      { type: 'Sunscreen', name: '', applied: true }
    ],
    notes: '',
    skinCondition: 'same' as 'improved' | 'same' | 'worse'
  });

  const getConditionInfo = (condition: string) => {
    switch (condition) {
      case 'improved':
        return { icon: '😊', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      case 'worse':
        return { icon: '😟', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
      default:
        return { icon: '😐', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  const completedRoutines = logs.length;
  const adherenceRate = Math.round((logs.filter(log => 
    log.products.filter(p => p.applied).length >= log.products.length - 1
  ).length / logs.length) * 100);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 via-white to-pink-50">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm">
        <button 
          onClick={() => onNavigate('home')}
          className="mb-4 -ml-2 p-2 rounded-full hover:bg-pink-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-pink-600" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900 leading-tight">Treatment Log</h2>
            <p className="text-sm text-gray-500">Track your skincare routine</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-xs text-gray-500">Routines</p>
            </div>
            <p className="text-2xl text-gray-900">{completedRoutines}</p>
            <p className="text-xs text-gray-500 mt-1">logged</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <p className="text-xs text-gray-500">Adherence</p>
            </div>
            <p className="text-2xl text-gray-900">{adherenceRate}%</p>
            <p className="text-xs text-gray-500 mt-1">completion rate</p>
          </div>
        </div>

        {/* Log Entries */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-pink-500 rounded-full" />
            <h3 className="text-gray-800">Recent Entries</h3>
          </div>

          {logs.map((log, index) => {
            const conditionInfo = getConditionInfo(log.skinCondition);
            const completedProducts = log.products.filter(p => p.applied).length;
            const totalProducts = log.products.length;
            
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      log.routine === 'morning' 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400' 
                        : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                    }`}>
                      {log.routine === 'morning' ? (
                        <Sun className="w-5 h-5 text-white" />
                      ) : (
                        <Moon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{log.routine === 'morning' ? '☀️ Morning' : '🌙 Evening'} Routine</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{log.date} • {log.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs ${conditionInfo.bg} ${conditionInfo.color} ${conditionInfo.border} border`}>
                    {conditionInfo.icon} {log.skinCondition}
                  </div>
                </div>

                {/* Products List */}
                <div className="space-y-2 mb-3">
                  {log.products.map((product, pIndex) => (
                    <div key={pIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      {product.applied ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">{product.type}</p>
                        <p className={`text-sm ${product.applied ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                          {product.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Completion</span>
                    <span>{completedProducts}/{totalProducts} products</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-pink-500 rounded-full transition-all"
                      style={{ width: `${(completedProducts / totalProducts) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Notes */}
                {log.notes && (
                  <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-600 italic">"{log.notes}"</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State Message */}
        {logs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-pink-400" />
            </div>
            <h3 className="text-gray-800 mb-2">No entries yet</h3>
            <p className="text-gray-500 mb-6">Start logging your treatment to track progress</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddEntry(true)}
        className="absolute bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full shadow-xl shadow-pink-400/50 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-10"
      >
        <Plus className="w-6 h-6 text-white" strokeWidth={3} />
      </button>

      {/* Add Entry Modal */}
      {showAddEntry && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-20 backdrop-blur-sm">
          <div className="w-full bg-white rounded-t-3xl p-6 pb-8 max-h-[80%] overflow-y-auto">
            <h3 className="text-gray-900 mb-4">Log Skincare Routine</h3>
            
            <div className="space-y-4 mb-6">
              {/* Routine Type */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Time of Day</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setNewEntry({ ...newEntry, routine: 'morning' })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      newEntry.routine === 'morning'
                        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <Sun className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                    <p className="text-sm text-gray-700">Morning</p>
                  </button>
                  <button
                    onClick={() => setNewEntry({ ...newEntry, routine: 'evening' })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      newEntry.routine === 'evening'
                        ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <Moon className="w-5 h-5 mx-auto mb-1 text-indigo-500" />
                    <p className="text-sm text-gray-700">Evening</p>
                  </button>
                </div>
              </div>

              {/* Skin Condition */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Skin Condition Today</label>
                <div className="grid grid-cols-3 gap-2">
                  {['improved', 'same', 'worse'].map((condition) => {
                    const info = getConditionInfo(condition);
                    return (
                      <button
                        key={condition}
                        onClick={() => setNewEntry({ ...newEntry, skinCondition: condition as any })}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          newEntry.skinCondition === condition
                            ? `${info.border} ${info.bg}`
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl mb-1 block">{info.icon}</span>
                        <p className="text-xs text-gray-700 capitalize">{condition}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Notes */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Notes (Optional)</label>
                <textarea 
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 resize-none text-sm"
                  rows={3}
                  placeholder="Any observations about your skin today..."
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddEntry(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const now = new Date();
                  const newLog: LogEntry = {
                    date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                    routine: newEntry.routine,
                    products: [
                      { type: 'Cleanser', name: 'CeraVe Foaming Cleanser', applied: true },
                      { type: 'Treatment', name: 'Niacinamide 10%', applied: true },
                      { type: 'Moisturizer', name: 'CeraVe PM Lotion', applied: true },
                      ...(newEntry.routine === 'morning' ? [{ type: 'Sunscreen', name: 'La Roche-Posay SPF 50', applied: true }] : [])
                    ],
                    notes: newEntry.notes,
                    skinCondition: newEntry.skinCondition
                  };
                  setLogs([newLog, ...logs]);
                  setShowAddEntry(false);
                  setNewEntry({
                    routine: 'morning',
                    products: [],
                    notes: '',
                    skinCondition: 'same'
                  });
                }}
                className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-xl shadow-lg shadow-pink-300/50 hover:shadow-xl transition-all"
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="log" onNavigate={onNavigate} />
    </div>
  );
}
