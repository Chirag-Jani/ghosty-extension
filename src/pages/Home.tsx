import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Copy, Globe, History, Plus, RefreshCw, Settings, Shield, Unlink, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock connected sites data
const mockConnectedSites = [
  { id: 1, domain: 'raydium.io', favicon: '🌊', connected: true },
  { id: 2, domain: 'jupiter.ag', favicon: '🪐', connected: false },
  { id: 3, domain: 'tensor.trade', favicon: '🎨', connected: true },
];

// Mock burner wallets data
const mockBurnerWallets = [
  { id: 1, address: '8xzt...9jLk', fullAddress: '8xztK2mN...9jLk', balance: 2.45, site: 'raydium.io', isActive: true },
  { id: 2, address: 'Hq3m...7vRt', fullAddress: 'Hq3mP4kL...7vRt', balance: 0.5, site: 'tensor.trade', isActive: false },
  { id: 3, address: 'F7ka...2mNp', fullAddress: 'F7kaL9qR...2mNp', balance: 0, site: 'jupiter.ag', isActive: false },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeWallet, setActiveWallet] = useState(mockBurnerWallets[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showWalletList, setShowWalletList] = useState(false);
  const [showSitesList, setShowSitesList] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);

  const totalBalance = mockBurnerWallets.reduce((sum, w) => sum + w.balance, 0);

  const generateNewBurner = () => {
    setIsGenerating(true);
    console.log(`[Veil] Generating new burner wallet...`);
    setTimeout(() => {
      const newAddr = "F7ka..." + Math.random().toString(36).substring(2, 6);
      console.log(`[Veil] New burner generated: ${newAddr}`);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeWallet.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMigrateFunds = () => {
    console.log(`[Veil] User initiated migration to Privacy Cash...`);
    console.log(`[Veil] Amount: ${activeWallet.balance} SOL from ${activeWallet.address}`);
  };

  const handleDisconnect = (domain: string) => {
    console.log(`[Veil] Disconnecting from ${domain}...`);
  };

  return (
    <div className="h-full w-full bg-black text-white relative flex flex-col overflow-hidden font-sans">
      {/* Ambient Background */}
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-purple-600/10 rounded-full blur-[60px]" />
      <div className="absolute bottom-[50px] left-[-30px] w-32 h-32 bg-blue-600/10 rounded-full blur-[40px]" />

      {/* Header & Wallet Selector */}
      <div className="flex justify-between items-start z-10 px-3 py-3 relative">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowWalletList(true)}
            className="flex items-center gap-3 transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-lg border border-white/10 group-hover:scale-105 transition-transform">
              <img src="/veil.png" alt="Veil" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[11px] text-gray-500 font-medium leading-none mb-0.5">@veil</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white tracking-tight">{activeWallet.site}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300 transition-colors" />
              </div>
            </div>
          </button>

          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCopyPopup(!showCopyPopup);
              }}
              className={`p-1 mt-3 rounded-md transition-colors relative z-[60] ${showCopyPopup ? 'bg-white/10 text-white' : 'text-gray-500 hover:bg-white/10 hover:text-white'}`}
            >
              <Copy className="w-3.5 h-3.5" />
            </button>

            {/* Address Copy Popup (Phantom style) moved to root level */}
          </div>
        </div>

        <div className="flex gap-1 pt-0.5">
          <button
            onClick={() => setShowSitesList(true)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 relative"
          >
            <Globe className="w-4 h-4 text-gray-400" />
            {mockConnectedSites.filter(s => s.connected).length > 0 && (
              <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full text-[9px] font-bold flex items-center justify-center">
                {mockConnectedSites.filter(s => s.connected).length}
              </div>
            )}
          </button>
          <button onClick={() => navigate('/history')} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
            <History className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={() => navigate('/settings')} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-3 pt-2 pb-3 z-10 flex flex-col">
        {/* Balance Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-4"
        >
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400 mb-1">
            {activeWallet.balance.toFixed(2)}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-lg text-gray-400 font-medium">SOL</span>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-sm text-gray-500 font-medium">
              ≈ ${(activeWallet.balance * 145).toFixed(2)}
            </span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mb-2">
          <button
            onClick={handleMigrateFunds}
            disabled={activeWallet.balance === 0}
            className={`py-3 px-4 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              activeWallet.balance > 0
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 active:scale-[0.98]'
                : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Migrate to Privacy</span>
          </button>
          <button
            onClick={generateNewBurner}
            disabled={isGenerating || activeWallet.balance > 0}
            className={`py-3 px-4 font-medium rounded-xl text-sm border flex items-center justify-center gap-2 transition-all ${
              activeWallet.balance === 0
                ? 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30 active:scale-[0.98]'
                : 'bg-white/5 text-gray-600 border-white/5 cursor-not-allowed'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'New Burner'}</span>
          </button>
        </div>

        {activeWallet.balance > 0 && (
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <div className="w-1 h-1 rounded-full bg-yellow-400/60" />
            <p className="text-[10px] text-center text-gray-500">
              Migrate funds before generating a new burner
            </p>
          </div>
        )}
      </div>

      {/* Wallet List Modal */}
      <AnimatePresence>
        {showWalletList && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWalletList(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl z-30 border-t border-white/10"
            >
              <div className="flex justify-center pt-2 pb-1">
                <div className="w-8 h-1 bg-white/20 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-4 pb-3">
                <h3 className="text-sm font-bold text-white">Burner Wallets</h3>
                <button onClick={() => setShowWalletList(false)} className="p-1.5 hover:bg-white/10 rounded-full">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="px-3 pb-3 max-h-64 overflow-y-auto">
                {mockBurnerWallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => { setActiveWallet(wallet); setShowWalletList(false); }}
                    className={`w-full p-2.5 rounded-lg flex items-center gap-2.5 transition-colors mb-1.5 ${activeWallet.id === wallet.id
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                      }`}
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
                      <img src="/veil.png" alt="Veil" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-white">{wallet.site}</span>
                        {activeWallet.id === wallet.id && (
                          <span className="px-1 py-0.5 text-[8px] bg-green-500/20 text-green-400 rounded font-bold">ACTIVE</span>
                        )}
                      </div>
                      <code className="text-[10px] text-gray-500 font-mono">{wallet.address}</code>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-white">{wallet.balance} SOL</p>
                      <p className="text-[10px] text-gray-500">${(wallet.balance * 145).toFixed(2)}</p>
                    </div>
                  </button>
                ))}

                <button
                  onClick={() => { setShowWalletList(false); generateNewBurner(); }}
                  className="w-full p-2.5 rounded-lg flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 transition-colors mt-1"
                >
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-400">Create New Burner</span>
                </button>
              </div>

              <div className="px-4 py-3 border-t border-white/10 bg-black/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Total Across All Burners</span>
                  <span className="text-sm font-bold text-white">{totalBalance.toFixed(2)} SOL</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Connected Sites Modal */}
      <AnimatePresence>
        {showSitesList && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSitesList(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl z-30 border-t border-white/10"
            >
              <div className="flex justify-center pt-2 pb-1">
                <div className="w-8 h-1 bg-white/20 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-4 pb-3">
                <h3 className="text-sm font-bold text-white">Connected Sites</h3>
                <button onClick={() => setShowSitesList(false)} className="p-1.5 hover:bg-white/10 rounded-full">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="px-3 pb-4 max-h-64 overflow-y-auto">
                {mockConnectedSites.filter(s => s.connected).length === 0 ? (
                  <div className="text-center py-6">
                    <Globe className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-500 text-xs">No connected sites</p>
                  </div>
                ) : (
                  mockConnectedSites.filter(s => s.connected).map((site) => (
                    <div key={site.id} className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-base">
                          {site.favicon}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white">{site.domain}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-[10px] text-gray-500">Connected</span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleDisconnect(site.domain)} className="p-1.5 hover:bg-red-500/10 rounded-md group">
                        <Unlink className="w-3.5 h-3.5 text-gray-500 group-hover:text-red-400" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Address Copy Popup (Phantom style) */}
      <AnimatePresence>
        {showCopyPopup && (
          <>
            <div
              className="fixed inset-0 z-[50] bg-transparent"
              onClick={() => setShowCopyPopup(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute top-14 left-3 w-64 bg-gray-900 border border-white/10 rounded-md shadow-2xl z-[60] p-1 overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-2.5 hover:bg-white/5 rounded-lg transition-colors group cursor-pointer"
                onClick={() => { handleCopy(); }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center border border-white/10">
                    <div className="w-3.5 h-3.5 bg-gradient-to-tr from-purple-500 to-green-500 rounded-full" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Solana</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-mono">{activeWallet.address}</span>
                  {copied ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-500 group-hover:text-white" />
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
