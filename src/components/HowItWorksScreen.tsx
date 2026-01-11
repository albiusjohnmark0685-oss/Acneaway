import { ChevronLeft, Brain, Camera, Scan, Sparkles, Database, Shield, Zap } from 'lucide-react';
import { Screen } from '../App';
import { BottomNavigation } from './BottomNavigation';
import { ImageWithFallback } from './ImageWithFallback';

interface HowItWorksScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HowItWorksScreen({ onNavigate }: HowItWorksScreenProps) {
  const steps = [
    {
      number: 1,
      icon: Camera,
      title: 'Capture Your Skin',
      description: 'Take a clear photo of the affected area in good lighting. Our AI works best with front-facing images.',
      color: 'from-purple-400 to-purple-600',
      details: [
        'Use natural daylight if possible',
        'Keep camera steady and focused',
        'Capture the full affected area',
        'No filters or editing needed'
      ]
    },
    {
      number: 2,
      icon: Scan,
      title: 'AI Analysis',
      description: 'Our deep learning model analyzes over 50 skin markers including redness, texture, inflammation, and lesion types.',
      color: 'from-blue-400 to-blue-600',
      details: [
        'Identifies acne type and severity',
        'Detects inflammation levels',
        'Analyzes skin texture patterns',
        'Considers your skin profile data'
      ]
    },
    {
      number: 3,
      icon: Database,
      title: 'Cross-Reference Database',
      description: 'We compare your results against thousands of dermatologically-verified acne cases and treatment outcomes.',
      color: 'from-pink-400 to-pink-600',
      details: [
        '50,000+ verified acne cases',
        'Clinical study database integration',
        'Real-world treatment outcomes',
        'Continuous learning from new data'
      ]
    },
    {
      number: 4,
      icon: Shield,
      title: 'FDA Verification',
      description: 'Recommended ingredients are cross-checked with FDA approval databases to ensure safety and efficacy.',
      color: 'from-green-400 to-green-600',
      details: [
        'FDA-approved ingredients only',
        'Safety profile verification',
        'Drug interaction checking',
        'Contraindication alerts'
      ]
    },
    {
      number: 5,
      icon: Sparkles,
      title: 'Personalized Plan',
      description: 'Receive your customized treatment plan with specific ingredients, products, and tracking tools.',
      color: 'from-orange-400 to-orange-600',
      details: [
        'Ingredient recommendations',
        'Product suggestions',
        'Treatment timeline',
        'Progress tracking tools'
      ]
    }
  ];

  const techSpecs = [
    { label: 'AI Model', value: 'Deep CNN (ResNet-152)' },
    { label: 'Training Data', value: '200K+ Images' },
    { label: 'Accuracy Rate', value: '94.8%' },
    { label: 'Processing Time', value: '< 2 seconds' }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 bg-gradient-to-b from-purple-100/50 to-transparent">
        <button 
          onClick={() => onNavigate('home')}
          className="mb-4 -ml-2 p-2 rounded-full hover:bg-purple-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-purple-600" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-gray-900 flex-1">How Our Scanner Works</h2>
        </div>
        <p className="text-gray-600">AI-powered skin analysis technology</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Hero Image */}
        <div className="mb-6 rounded-2xl overflow-hidden">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1620423855978-e5d74a7bef30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neSUyMHNjYW5uZXJ8ZW58MXx8fHwxNzYyODU0NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="AI Scanner Technology"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Introduction */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-5 mb-6">
          <h3 className="text-purple-900 mb-2">🤖 Advanced AI Technology</h3>
          <p className="text-sm text-purple-800">
            Our scanner uses state-of-the-art computer vision and deep learning to analyze your skin 
            with dermatologist-level accuracy. Here's how it works, step by step.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-6 mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-lg shadow-purple-100/50"
              >
                {/* Step Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 relative`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                      <span className="text-xs text-gray-700">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 ml-[72px]">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Specs */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 mb-6 text-white">
          <h3 className="text-white mb-4">⚙️ Technical Specifications</h3>
          <div className="grid grid-cols-2 gap-4">
            {techSpecs.map((spec, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-xs text-gray-300 mb-1">{spec.label}</p>
                <p className="text-white">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
          <h3 className="text-blue-900 mb-3">🔒 Privacy & Security</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900">Your photos are encrypted and never shared</p>
                <p className="text-xs text-blue-700">End-to-end encryption during transmission</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900">Analysis happens on secure servers</p>
                <p className="text-xs text-blue-700">HIPAA-compliant data handling</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900">You can delete your data anytime</p>
                <p className="text-xs text-blue-700">Full control over your information</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => onNavigate('pre-scan')}
          className="w-full py-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-2xl shadow-lg shadow-purple-300/50 hover:shadow-xl hover:shadow-purple-400/50 transition-all active:scale-95"
        >
          Try the Scanner Now
        </button>

        {/* Bottom Note */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
          <p className="text-xs text-yellow-900">
            <span className="font-medium">⚠️ Medical Disclaimer:</span> This AI tool is for informational purposes 
            and should not replace professional medical advice. For severe or persistent acne, please consult a dermatologist.
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}