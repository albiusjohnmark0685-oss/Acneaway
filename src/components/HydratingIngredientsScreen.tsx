import { ChevronLeft, Droplet, CheckCircle2 } from 'lucide-react';
import { Screen } from '../App';
import { BottomNavigation } from './BottomNavigation';
import { ImageWithFallback } from './ImageWithFallback';

interface HydratingIngredientsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HydratingIngredientsScreen({ onNavigate }: HydratingIngredientsScreenProps) {
  const ingredients = [
    {
      name: 'Hyaluronic Acid',
      emoji: '💧',
      description: 'A powerful humectant that can hold up to 1000x its weight in water, helping to keep acne-prone skin hydrated without clogging pores.',
      benefits: [
        'Draws moisture into the skin',
        'Plumps and smooths texture',
        'Non-comedogenic (won\'t clog pores)',
        'Suitable for all skin types'
      ],
      howToUse: 'Apply to damp skin before moisturizer, twice daily'
    },
    {
      name: 'Glycerin',
      emoji: '🌊',
      description: 'A gentle, skin-replenishing ingredient that helps maintain the skin\'s moisture barrier and prevents water loss.',
      benefits: [
        'Locks in moisture',
        'Strengthens skin barrier',
        'Reduces irritation from acne treatments',
        'Improves skin elasticity'
      ],
      howToUse: 'Look for it in cleansers and moisturizers'
    },
    {
      name: 'Niacinamide',
      emoji: '✨',
      description: 'A form of Vitamin B3 that not only hydrates but also helps regulate oil production, reduce inflammation, and fade acne marks.',
      benefits: [
        'Hydrates and balances oil',
        'Reduces inflammation and redness',
        'Minimizes pore appearance',
        'Fades dark spots and hyperpigmentation'
      ],
      howToUse: 'Apply 2-5% serum morning and evening'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 bg-gradient-to-b from-blue-100/50 to-transparent">
        <button 
          onClick={() => onNavigate('home')}
          className="mb-4 -ml-2 p-2 rounded-full hover:bg-blue-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-blue-600" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
            <Droplet className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-gray-900 flex-1">Top 3 Hydrating Ingredients</h2>
        </div>
        <p className="text-gray-600">Essential hydration for acne-prone skin</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Hero Image */}
        <div className="mb-6 rounded-2xl overflow-hidden">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1647708625815-b26b5ad4114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXRzJTIwaHlkcmF0aW9ufGVufDF8fHx8MTc2Mjg1NDc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hydrating Ingredients"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
          <h3 className="text-blue-900 mb-2">Why Hydration Matters for Acne</h3>
          <p className="text-sm text-blue-800">
            Many people with acne avoid moisturizers, fearing they'll worsen breakouts. However, proper hydration is crucial! 
            Dehydrated skin can overproduce oil, leading to more acne. These ingredients hydrate without clogging pores.
          </p>
        </div>

        {/* Ingredients List */}
        <div className="space-y-6">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-lg shadow-blue-100/50"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{ingredient.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <h3 className="text-gray-900">{ingredient.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{ingredient.description}</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-4">
                <h4 className="text-gray-800 mb-3">Key Benefits:</h4>
                <div className="space-y-2">
                  {ingredient.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to Use */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="text-blue-900 mb-2">How to Use:</h4>
                <p className="text-sm text-blue-800">{ingredient.howToUse}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tip */}
        <div className="mt-6 p-5 bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100 rounded-2xl">
          <h4 className="text-gray-900 mb-2">💡 Pro Tip</h4>
          <p className="text-sm text-gray-700">
            You can combine all three of these ingredients in your routine! Use them together for maximum hydration. 
            They work synergistically and won't interfere with your acne treatments.
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}