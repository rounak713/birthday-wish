import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SoundProvider } from './components/SoundContext';
import { ConfigProvider, useConfig } from './hooks/useConfig';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import PasscodeScreen from './components/PasscodeScreen';
import WelcomeScreen from './components/WelcomeScreen';
import TrapScreen from './components/TrapScreen';
import GiftScreen from './components/GiftScreen';
import CakeScreen from './components/CakeScreen';
import HappyBirthdayScreen from './components/HappyBirthdayScreen';
import MemoryScreen from './components/MemoryScreen';
import FinalScreen from './components/FinalScreen';
import AudioPlayer from './components/AudioPlayer';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const [currentStep, setCurrentStep] = useState(0); // 0 is loading
  const [showAdmin, setShowAdmin] = useState(false);
  
  const handleLoadingComplete = () => {
    setCurrentStep(1); // 1 is Passcode
  };

  const nextStep = () => {
    // Vibration feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    setCurrentStep((prev) => prev + 1);
  };
  
  const handleAdmin = () => {
    setShowAdmin(true);
  };

  const closeAdmin = () => {
    setShowAdmin(false);
    // Refresh to apply new config easily, or just rely on state
  };

  const reset = () => setCurrentStep(1);

  return (
    <div className="app-container">
      <CustomCursor />
      <ParticleBackground />
      {currentStep > 0 && <AudioPlayer />}
      
      <AnimatePresence mode="wait">
        {showAdmin && <AdminDashboard key="admin" onExit={closeAdmin} />}
        
        {!showAdmin && currentStep === 0 && <LoadingScreen key="loading" onComplete={handleLoadingComplete} />}
        {!showAdmin && currentStep === 1 && <PasscodeScreen key="step1" onNext={nextStep} onAdmin={handleAdmin} />}
        {!showAdmin && currentStep === 2 && <WelcomeScreen key="step2" onNext={() => setCurrentStep(4)} onTrap={() => setCurrentStep(3)} />}
        {!showAdmin && currentStep === 3 && <TrapScreen key="step3" onRetry={() => setCurrentStep(2)} />}
        {!showAdmin && currentStep === 4 && <CakeScreen key="step4" onNext={nextStep} />}
        {!showAdmin && currentStep === 5 && <HappyBirthdayScreen key="step5" onNext={nextStep} />}
        {!showAdmin && currentStep === 6 && <GiftScreen key="step6" onNext={nextStep} />}
        {!showAdmin && currentStep === 7 && <MemoryScreen key="step7" onNext={nextStep} />}
        {!showAdmin && currentStep === 8 && <FinalScreen key="step8" onReset={reset} />}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ConfigProvider>
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </ConfigProvider>
  );
}

export default App;
