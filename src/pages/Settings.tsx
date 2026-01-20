import { ArrowLeft, Clock, Globe, Key, Shield, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [timingObfuscation, setTimingObfuscation] = useState(true);
  const [autoConnect, setAutoConnect] = useState(false);

  return (
    <div className="h-full w-full bg-black text-white p-5 relative flex flex-col font-sans overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="space-y-6 flex-1">
        {/* Privacy Settings */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Privacy</h3>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">Timing Obfuscation</p>
                  <p className="text-xs text-gray-500">Add random delays to migrations</p>
                </div>
              </div>
              <button 
                onClick={() => setTimingObfuscation(!timingObfuscation)}
                className={`h-5 w-9 rounded-full p-0.5 transition-colors ${timingObfuscation ? 'bg-green-500/20' : 'bg-gray-700'}`}
              >
                <div className={`h-4 w-4 rounded-full shadow-sm transition-all ${timingObfuscation ? 'bg-green-500 ml-auto' : 'bg-gray-500 ml-0'}`} />
              </button>
            </div>

            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">Privacy Cash</p>
                  <p className="text-xs text-gray-500">Migrate funds for unlinkability</p>
                </div>
              </div>
              <button className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Connection Settings */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Connections</h3>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">Auto-Connect</p>
                  <p className="text-xs text-gray-500">Connect automatically to trusted sites</p>
                </div>
              </div>
              <button 
                onClick={() => setAutoConnect(!autoConnect)}
                className={`h-5 w-9 rounded-full p-0.5 transition-colors ${autoConnect ? 'bg-green-500/20' : 'bg-gray-700'}`}
              >
                <div className={`h-4 w-4 rounded-full shadow-sm transition-all ${autoConnect ? 'bg-green-500 ml-auto' : 'bg-gray-500 ml-0'}`} />
              </button>
            </div>

            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">Connected Sites</p>
                  <p className="text-xs text-gray-500">3 sites with active burners</p>
                </div>
              </div>
              <button className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                View All
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Security</h3>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5">
              <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
                <Key className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Backup Seed Phrase</p>
                <p className="text-xs text-gray-500">View your 12-word recovery phrase</p>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-colors text-red-400">
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Clear All Local Data</span>
            </div>
          </div>
        </div>

        {/* Burner Management */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Burner Management</h3>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-300">Active Burners</span>
              <span className="text-sm font-bold text-white">3</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-300">Retired Burners</span>
              <span className="text-sm font-bold text-gray-500">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Total Derived</span>
              <span className="text-sm font-bold text-gray-500">15</span>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <p className="text-xs text-gray-600">
                Burners are deterministically derived from your master seed. Retired burners are never reused.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center pt-4 border-t border-white/5">
        <p className="text-xs text-gray-700">Veil v0.1.0 (Alpha)</p>
        <p className="text-xs text-gray-800 mt-1">Non-custodial • Privacy by default</p>
      </div>
    </div>
  );
};

export default Settings;
