import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { PreScanScreen } from './components/PreScanScreen';
import { ScanScreen } from './components/ScanScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { TreatmentLogScreen } from './components/TreatmentLogScreen';
import { HydratingIngredientsScreen } from './components/HydratingIngredientsScreen';
import { NaturalTreatmentsScreen } from './components/NaturalTreatmentsScreen';
import { HowItWorksScreen } from './components/HowItWorksScreen';

export type Screen = 'splash' | 'home' | 'pre-scan' | 'scan' | 'results' | 'log' | 'hydrating' | 'natural' | 'how-it-works';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [scanData, setScanData] = useState({
    skinColor: '',
    skinType: '',
    conditions: [] as string[],
    environment: ''
  });
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Mobile Frame */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden">
        {currentScreen === 'splash' && <SplashScreen onNavigate={navigateTo} />}
        {currentScreen === 'home' && <HomeScreen onNavigate={navigateTo} />}
        {currentScreen === 'pre-scan' && <PreScanScreen onNavigate={navigateTo} scanData={scanData} setScanData={setScanData} />}
        {currentScreen === 'scan' && <ScanScreen onNavigate={navigateTo} scanData={scanData} setAnalysisResults={setAnalysisResults} />}
        {currentScreen === 'results' && <ResultsScreen onNavigate={navigateTo} analysisResults={analysisResults} />}
        {currentScreen === 'log' && <TreatmentLogScreen onNavigate={navigateTo} />}
        {currentScreen === 'hydrating' && <HydratingIngredientsScreen onNavigate={navigateTo} />}
        {currentScreen === 'natural' && <NaturalTreatmentsScreen onNavigate={navigateTo} />}
        {currentScreen === 'how-it-works' && <HowItWorksScreen onNavigate={navigateTo} />}
      </div>
    </div>
  );
}