import { ChevronLeft, Leaf, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Screen } from '../App';
import { BottomNavigation } from './BottomNavigation';
import { ImageWithFallback } from './ImageWithFallback';

interface NaturalTreatmentsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function NaturalTreatmentsScreen({ onNavigate }: NaturalTreatmentsScreenProps) {
  const treatments = [
    {
      name: 'Tea Tree Oil',
      emoji: '🌿',
      effectiveness: 'High',
      aiScore: 92,
      description: 'A natural antibacterial and anti-inflammatory essential oil that has been clinically proven to reduce acne.',
      benefits: [
        'Kills acne-causing bacteria',
        'Reduces inflammation and redness',
        'Natural alternative to benzoyl peroxide',
        'Helps prevent future breakouts'
      ],
      howToUse: 'Dilute 1-2 drops in carrier oil (like jojoba) and apply to affected areas',
      caution: 'Always dilute before use. Patch test first.'
    },
    {
      name: 'Green Tea Extract',
      emoji: '🍵',
      effectiveness: 'Medium-High',
      aiScore: 88,
      description: 'Rich in antioxidants (EGCG) that help reduce sebum production and fight inflammation.',
      benefits: [
        'Reduces oil production',
        'Anti-inflammatory properties',
        'Fights free radicals',
        'Soothes irritated skin'
      ],
      howToUse: 'Apply cooled green tea as a toner, or use products with green tea extract',
      caution: 'Safe for most skin types. Store properly to prevent oxidation.'
    },
    {
      name: 'Aloe Vera',
      emoji: '🌱',
      effectiveness: 'Medium',
      aiScore: 85,
      description: 'A soothing plant with antibacterial and anti-inflammatory properties that also aids healing.',
      benefits: [
        'Soothes inflamed acne',
        'Promotes healing and repair',
        'Moisturizes without clogging pores',
        'Reduces acne scars over time'
      ],
      howToUse: 'Apply pure aloe vera gel directly to skin, 2-3 times daily',
      caution: 'Use pure aloe vera gel. Avoid products with added fragrances.'
    },
    {
      name: 'Honey (Manuka)',
      emoji: '🍯',
      effectiveness: 'Medium',
      aiScore: 83,
      description: 'Medical-grade honey with powerful antibacterial properties and wound-healing benefits.',
      benefits: [
        'Natural antibacterial action',
        'Draws out impurities',
        'Gentle on sensitive skin',
        'Provides moisture and healing'
      ],
      howToUse: 'Use as a spot treatment or face mask for 15-20 minutes',
      caution: 'Look for medical-grade Manuka honey with high UMF rating.'
    },
    {
      name: 'Witch Hazel',
      emoji: '🌸',
      effectiveness: 'Low-Medium',
      aiScore: 78,
      description: 'A natural astringent that helps tighten pores and reduce inflammation.',
      benefits: [
        'Tightens pores',
        'Reduces excess oil',
        'Gentle anti-inflammatory',
        'Soothes irritation'
      ],
      howToUse: 'Apply as a toner after cleansing',
      caution: 'Choose alcohol-free versions to avoid drying out skin.'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-400 to-green-600';
    if (score >= 80) return 'from-blue-400 to-blue-600';
    return 'from-yellow-400 to-yellow-600';
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 bg-gradient-to-b from-green-100/50 to-transparent">
        <button 
          onClick={() => onNavigate('home')}
          className="mb-4 -ml-2 p-2 rounded-full hover:bg-green-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-green-600" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-gray-900 flex-1">Natural Treatments</h2>
        </div>
        <p className="text-gray-600">AI-Approved natural acne remedies</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Hero Image */}
        <div className="mb-6 rounded-2xl overflow-hidden">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1760108249194-f9cafd970762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBpbmdyZWRpZW50cyUyMHBsYW50c3xlbnwxfHx8fDE3NjI4NTQ3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Natural Treatments"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Introduction */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
          <h3 className="text-green-900 mb-2">🤖 AI-Verified Natural Solutions</h3>
          <p className="text-sm text-green-800 mb-3">
            Our AI has analyzed thousands of clinical studies to verify which natural treatments actually work for acne. 
            These ingredients are backed by science, not just tradition.
          </p>
          <div className="flex items-center gap-2 text-sm text-green-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>All rated based on clinical evidence</span>
          </div>
        </div>

        {/* Treatments List */}
        <div className="space-y-5">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-5 shadow-lg shadow-green-100/50"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="text-4xl">{treatment.emoji}</div>
                  <div>
                    <h3 className="text-gray-900 mb-1">{treatment.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getScoreColor(treatment.aiScore)} text-white text-xs`}>
                        AI Score: {treatment.aiScore}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{treatment.description}</p>

              {/* Benefits */}
              <div className="mb-4">
                <h4 className="text-gray-800 text-sm mb-2">Benefits:</h4>
                <div className="space-y-1.5">
                  {treatment.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to Use */}
              <div className="bg-green-50 rounded-xl p-3 mb-3">
                <h4 className="text-green-900 text-sm mb-1">How to Use:</h4>
                <p className="text-xs text-green-800">{treatment.howToUse}</p>
              </div>

              {/* Caution */}
              <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-orange-900">{treatment.caution}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-6 p-5 bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100 rounded-2xl">
          <h4 className="text-gray-900 mb-2">⚠️ Important Note</h4>
          <p className="text-sm text-gray-700">
            While these natural treatments are effective, they may work slower than conventional treatments. 
            For severe acne, consult a dermatologist. Natural doesn't always mean better for everyone!
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}