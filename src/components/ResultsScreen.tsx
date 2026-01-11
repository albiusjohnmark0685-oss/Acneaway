import { ChevronLeft, CheckCircle2, ExternalLink, Activity, Microscope, ShoppingBag, AlertTriangle } from 'lucide-react';
import { Screen } from '../App';
import { BottomNavigation } from './BottomNavigation';

interface ResultsScreenProps {
  onNavigate: (screen: Screen) => void;
  analysisResults: any;
}

export function ResultsScreen({ onNavigate, analysisResults }: ResultsScreenProps) {
  if (!analysisResults) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50">
        <div className="text-center p-6">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h3 className="text-gray-800 mb-2">No Analysis Data</h3>
          <p className="text-sm text-gray-500 mb-4">Please complete a skin scan first.</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-xl"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const { primaryDiagnosis, severity, indicators, confidence, detections, ingredients, recommendations } = analysisResults;

  // Determine severity color
  const getSeverityColor = (sev: string) => {
    if (sev === 'Severe') return 'from-red-400 to-red-600';
    if (sev === 'Moderate') return 'from-orange-400 to-orange-600';
    return 'from-yellow-400 to-yellow-600';
  };

  const getSeverityBadgeColor = (sev: string) => {
    if (sev === 'Severe') return 'bg-red-100 text-red-700';
    if (sev === 'Moderate') return 'bg-orange-100 text-orange-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
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
            <Microscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900 leading-tight">Analysis Complete</h2>
            <p className="text-sm text-gray-500">Clinical diagnosis results</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Main Result Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${getSeverityColor(severity)} rounded-xl flex items-center justify-center`}>
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Primary Diagnosis</h3>
                <p className="text-xs text-gray-500">AI-Powered Detection</p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-700">{confidence}% Confidence</span>
              </div>
            </div>
          </div>
          
          <div className={`mb-4 p-4 bg-gradient-to-br ${getSeverityColor(severity).replace('to-', 'to-').replace('from-', 'from-').replace('-400', '-50').replace('-600', '-100')} rounded-2xl border border-${severity === 'Severe' ? 'red' : severity === 'Moderate' ? 'orange' : 'yellow'}-200`}>
            <h1 className={`${severity === 'Severe' ? 'text-red-600' : severity === 'Moderate' ? 'text-orange-600' : 'text-yellow-600'} mb-1`}>{primaryDiagnosis}</h1>
            <p className="text-sm text-gray-600 mb-2">Severity: {severity}</p>
            <div className="flex flex-wrap gap-2">
              {indicators.map((indicator: string, i: number) => (
                <span key={i} className="text-xs px-2 py-1 bg-white/70 rounded-full text-gray-700">
                  {indicator}
                </span>
              ))}
            </div>
          </div>

          {/* Detection Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-pink-500 rounded-full" />
              <h3 className="text-gray-800 text-sm">Detected Conditions ({detections.length})</h3>
            </div>
            {detections.map((detection: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-pink-500 rounded-full" />
                    <p className="text-sm text-gray-700">{detection.type}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <p className="text-xs text-gray-500">{detection.count} detected</p>
                    <p className="text-xs text-gray-400">• {detection.location}</p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${getSeverityBadgeColor(detection.severity)}`}>
                  {detection.severity}
                </span>
              </div>
            ))}
          </div>

          {/* Confidence Visualization */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#E5E7EB"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56 * (confidence / 100)} ${2 * Math.PI * 56}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">{confidence}%</span>
                <span className="text-xs text-gray-500">Accuracy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Plan Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-pink-500 rounded-full" />
            <h3 className="text-gray-800">💊 Recommended Treatment Plan</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Based on your {primaryDiagnosis.toLowerCase()}, our AI recommends {ingredients.length} active ingredients:
          </p>
          
          <div className="space-y-4 mb-4">
            {ingredients.map((ingredient: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-pink-50">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-pink-500 text-white rounded-lg flex items-center justify-center text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{ingredient.name}</p>
                      <p className="text-xs text-gray-500">{ingredient.purpose}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-white rounded-lg border border-pink-200">
                    <span className="text-xs text-pink-600">{ingredient.concentration}</span>
                  </div>
                </div>
                
                {/* Product Recommendations */}
                <div className="p-4 bg-white space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingBag className="w-3 h-3 text-blue-500" />
                    <p className="text-xs text-gray-600">Verified Products:</p>
                  </div>
                  {ingredient.products.map((product: any, pIndex: number) => (
                    <a
                      key={pIndex}
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span className="text-xs text-gray-700 group-hover:text-pink-600">{product.name}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-pink-500" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 px-1 mb-4">
            ✓ All products are from verified, reputable brands and contain clinically proven concentrations.
          </p>

          {/* Recommendations */}
          <div className="mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
            <p className="text-xs text-gray-700 mb-2">📋 <span className="font-medium">Treatment Guidelines:</span></p>
            <ul className="space-y-1">
              {recommendations.map((rec: string, i: number) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FDA Information */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-pink-500 rounded-full" />
            <h3 className="text-gray-800">🏛️ FDA Verification</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            All recommended ingredients are FDA-approved for acne treatment. View official documentation:
          </p>

          <div className="space-y-3">
            <a
              href="https://www.fda.gov/drugs/information-consumers-and-patients-drugs/treating-acne"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-800 group-hover:text-blue-600 transition-colors">FDA: Treating Acne</p>
                  <p className="text-xs text-gray-500">Official consumer information</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-blue-400 flex-shrink-0" />
            </a>

            <a
              href="https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/questions-and-answers-fdas-actions-acne-products"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-800 group-hover:text-purple-600 transition-colors">FDA: Drug Safety Info</p>
                  <p className="text-xs text-gray-500">Q&A on acne products</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-purple-400 flex-shrink-0" />
            </a>

            <a
              href="https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl border border-pink-200 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-800 group-hover:text-pink-600 transition-colors">FDA Drug Database</p>
                  <p className="text-xs text-gray-500">Search approved medications</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-pink-400 flex-shrink-0" />
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => onNavigate('log')}
            className="w-full py-4 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-2xl shadow-lg shadow-pink-300/50 hover:shadow-xl hover:shadow-pink-400/50 transition-all active:scale-95"
          >
            📊 View Full Treatment Plan
          </button>
          
          <button 
            onClick={() => onNavigate('pre-scan')}
            className="w-full py-4 rounded-2xl border-2 border-pink-400 text-pink-600 hover:bg-pink-50 transition-colors active:scale-95 flex items-center justify-center gap-2"
          >
            <span>🔄 Scan Another Image</span>
          </button>
        </div>

        {/* Medical Disclaimer */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <p className="text-xs text-amber-900">
            <span className="font-medium">⚠️ Medical Disclaimer:</span> This AI analysis provides educational information only. Results should not replace professional medical advice. For persistent or severe acne, consult a board-certified dermatologist. Individual results may vary based on skin type, genetics, and lifestyle factors.
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="scan" onNavigate={onNavigate} />
    </div>
  );
}