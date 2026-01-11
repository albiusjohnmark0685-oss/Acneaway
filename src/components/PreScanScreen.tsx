import { ChevronLeft, Check } from 'lucide-react';
import { Screen } from '../App';
import { BottomNavigation } from './BottomNavigation';

interface PreScanScreenProps {
  onNavigate: (screen: Screen) => void;
  scanData: {
    skinColor: string;
    skinType: string;
    conditions: string[];
    environment: string;
  };
  setScanData: (data: any) => void;
}

export function PreScanScreen({ onNavigate, scanData, setScanData }: PreScanScreenProps) {
  const skinColors = [
    { label: 'Fair', color: '#FFE1D6' },
    { label: 'Light', color: '#FFD3BF' },
    { label: 'Medium', color: '#E6B298' },
    { label: 'Tan', color: '#D89A7C' },
    { label: 'Brown', color: '#A9746A' },
    { label: 'Deep', color: '#623B2A' }
  ];

  const skinTypes = [
    { label: 'Oily', emoji: '💦' },
    { label: 'Dry', emoji: '🌬' },
    { label: 'Combination', emoji: '🔆' },
    { label: 'Normal', emoji: '🌸' }
  ];

  const conditions = [
    'Vitiligo',
    'Eczema',
    'Psoriasis',
    'Sensitive Skin',
    'Acne Scarring',
    'Hyperpigmentation'
  ];

  const environments = [
    'Indoor most of the day',
    'Outdoor exposure (sun/dust)',
    'Mixed indoor/outdoor'
  ];

  const toggleCondition = (condition: string) => {
    setScanData({
      ...scanData,
      conditions: scanData.conditions.includes(condition)
        ? scanData.conditions.filter(c => c !== condition)
        : [...scanData.conditions, condition]
    });
  };

  const canProceed = scanData.skinColor && scanData.skinType && scanData.environment;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 bg-gradient-to-b from-pink-50 to-transparent">
        <button 
          onClick={() => onNavigate('home')}
          className="mb-4 -ml-2 p-2 rounded-full hover:bg-pink-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-pink-600" />
        </button>
        <h2 className="text-gray-900 mb-2">Before Scanning…</h2>
        <p className="text-gray-600">Tell us more about your skin to improve accuracy.</p>
      </div>

      {/* Scrollable Form */}
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Skin Color Section */}
        <div className="mb-8">
          <h3 className="text-gray-800 mb-4">🩸 Skin Color</h3>
          <div className="grid grid-cols-3 gap-3">
            {skinColors.map((skin) => (
              <button
                key={skin.label}
                onClick={() => setScanData({ ...scanData, skinColor: skin.label })}
                className={`relative rounded-2xl p-4 transition-all ${
                  scanData.skinColor === skin.label
                    ? 'ring-4 ring-pink-400 ring-offset-2 scale-105'
                    : 'ring-1 ring-gray-200 hover:ring-pink-200'
                }`}
                style={{ backgroundColor: skin.color }}
              >
                <div className="aspect-square rounded-xl" />
                {scanData.skinColor === skin.label && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                )}
                <p className="text-xs mt-2 text-center text-gray-700">{skin.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Skin Type Section */}
        <div className="mb-8">
          <h3 className="text-gray-800 mb-4">💧 Skin Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {skinTypes.map((type) => (
              <button
                key={type.label}
                onClick={() => setScanData({ ...scanData, skinType: type.label })}
                className={`p-4 rounded-2xl transition-all ${
                  scanData.skinType === type.label
                    ? 'bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg shadow-pink-300/50'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl mb-2 block">{type.emoji}</span>
                <span className="text-sm">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Existing Conditions */}
        <div className="mb-8">
          <h3 className="text-gray-800 mb-2">⚕️ Existing Conditions</h3>
          <p className="text-sm text-gray-500 mb-4">This helps our AI differentiate acne from other conditions.</p>
          <div className="space-y-3">
            {conditions.map((condition) => (
              <button
                key={condition}
                onClick={() => toggleCondition(condition)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                  scanData.conditions.includes(condition)
                    ? 'bg-pink-50 border-2 border-pink-400'
                    : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                  scanData.conditions.includes(condition)
                    ? 'bg-pink-500 border-pink-500'
                    : 'bg-white border-gray-300'
                }`}>
                  {scanData.conditions.includes(condition) && (
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  )}
                </div>
                <span className="text-gray-700">{condition}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Environment Section */}
        <div className="mb-8">
          <h3 className="text-gray-800 mb-4">🌍 Environment</h3>
          <div className="space-y-3">
            {environments.map((env) => (
              <button
                key={env}
                onClick={() => setScanData({ ...scanData, environment: env })}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  scanData.environment === env
                    ? 'bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg shadow-pink-300/50'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {env}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => canProceed && onNavigate('scan')}
          disabled={!canProceed}
          className={`w-full py-4 rounded-2xl transition-all mb-2 ${
            canProceed
              ? 'bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg shadow-pink-400/50 hover:shadow-xl active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          📤 Upload & Analyze Image
        </button>
        <p className="text-xs text-center text-gray-400 mb-8">
          Data used only for accurate AI analysis.
        </p>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="scan" onNavigate={onNavigate} />
    </div>
  );
}