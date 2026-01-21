import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Copy, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type OnboardingStep = 'welcome' | 'create' | 'restore' | 'verify';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [copied, setCopied] = useState(false);
  const [showSeed, setShowSeed] = useState(false);
  const [restoreInput, setRestoreInput] = useState('');
  const [restoreError, setRestoreError] = useState('');

  // Mock Seed Phrase
  const mockSeed = [
    "ghost", "valley", "shield", "protect", "random", "solar",
    "energy", "crypto", "privacy", "secure", "logic", "wave"
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(mockSeed.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComplete = () => {
    console.log('[Veil] Wallet created/restored. Navigating to home...');
    navigate('/home');
  };

  const handleRestore = () => {
    const words = restoreInput.trim().split(/\s+/);
    if (words.length !== 12) {
      setRestoreError('Please enter exactly 12 words');
      return;
    }
    console.log('[Veil] Restoring wallet from seed phrase...');
    handleComplete();
  };

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-black via-gray-900 to-slate-900 p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />

      <AnimatePresence mode="wait">
        {/* Welcome Step */}
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="z-10 w-full max-w-xs space-y-8"
          >
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl backdrop-blur-md overflow-hidden p-3">
                <img src="/veil.png" alt="Veil Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Veil</h1>
                <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                  Connect anywhere without risking your main wallet.
                </p>
                <p className="text-gray-600 mt-2 text-xs">
                  One-time burner wallets for every dApp.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setStep('create')}
                  className="group w-full py-3.5 px-4 bg-white text-black font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Create New Wallet
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setStep('restore')}
                  className="w-full py-3.5 px-4 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  Restore Existing Wallet
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Create Wallet Step */}
        {step === 'create' && (
          <motion.div
            key="create"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="z-10 w-full max-w-xs space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">Secure Your Seed</h2>
              <p className="text-gray-400 text-sm mt-2">
                Write these 12 words down. This is the <span className="text-red-400 font-semibold">ONLY</span> way to recover your funds.
              </p>
            </div>

            <div className="relative">
              <div className={`grid grid-cols-3 gap-2 transition-all ${!showSeed ? 'blur-md' : ''}`}>
                {mockSeed.map((word, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-2 text-center text-xs text-gray-300 font-mono">
                    <span className="text-gray-600 mr-1.5 select-none">{i + 1}</span>
                    {word}
                  </div>
                ))}
              </div>

              {!showSeed && (
                <button
                  onClick={() => setShowSeed(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl"
                >
                  <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">Reveal Seed Phrase</span>
                  </div>
                </button>
              )}
            </div>

            {showSeed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <button
                  onClick={handleCopy}
                  className="w-full py-2 px-3 bg-white/5 text-gray-300 text-sm font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied to clipboard" : "Copy to clipboard"}
                </button>

                <button
                  onClick={() => setShowSeed(false)}
                  className="w-full py-2 px-3 text-gray-500 text-sm font-medium flex items-center justify-center gap-2 hover:text-gray-300 transition-colors"
                >
                  <EyeOff className="w-4 h-4" />
                  Hide Seed Phrase
                </button>

                <button
                  onClick={handleComplete}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/20"
                >
                  I Saved It Securely
                </button>
              </motion.div>
            )}

            <button
              onClick={() => setStep('welcome')}
              className="w-full text-center text-gray-600 text-sm hover:text-gray-400 transition-colors"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {/* Restore Wallet Step */}
        {step === 'restore' && (
          <motion.div
            key="restore"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="z-10 w-full max-w-xs space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">Restore Wallet</h2>
              <p className="text-gray-400 text-sm mt-2">
                Enter your 12-word seed phrase to restore your wallet and burner history.
              </p>
            </div>

            <div>
              <textarea
                value={restoreInput}
                onChange={(e) => {
                  setRestoreInput(e.target.value);
                  setRestoreError('');
                }}
                placeholder="Enter your 12-word seed phrase..."
                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300 font-mono placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors resize-none"
              />
              {restoreError && (
                <p className="text-red-400 text-xs mt-2">{restoreError}</p>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={handleRestore}
                disabled={!restoreInput.trim()}
                className={`w-full py-3.5 px-4 font-semibold rounded-xl transition-all ${
                  restoreInput.trim()
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/20'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                Restore Wallet
              </button>

              <button
                onClick={() => setStep('welcome')}
                className="w-full text-center text-gray-600 text-sm hover:text-gray-400 transition-colors"
              >
                ← Back
              </button>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
              <p className="text-xs text-yellow-500/80 text-center">
                ⚠️ Never share your seed phrase. Veil will never ask for it.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
