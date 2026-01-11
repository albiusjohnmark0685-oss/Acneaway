import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../App';

interface SplashScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function SplashScreen({ onNavigate }: SplashScreenProps) {
  useEffect(() => {
    // Auto-navigate to home after 2.5 seconds
    const timer = setTimeout(() => {
      onNavigate('home');
    }, 2500);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 relative overflow-hidden">
      {/* Animated background circles */}
      <motion.div
        className="absolute w-96 h-96 bg-white/10 rounded-full"
        style={{ top: '-10%', right: '-10%' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-white/10 rounded-full"
        style={{ bottom: '-5%', left: '-5%' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Main Content */}
      <motion.div
        className="text-center z-10 px-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo/Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-6xl">💖</span>
            </div>
            {/* Sparkle effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* App Name - Large and Prominent */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-white text-6xl mb-3 tracking-tight">
            ACNE AWAY
          </h1>
          <div className="h-1 w-32 bg-white/80 rounded-full mx-auto mb-4" />
          <p className="text-white/90 text-xl">
            Clear Skin Starts Here
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-white/70 mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          AI-Powered Skin Analysis
        </motion.p>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        className="absolute bottom-16 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
