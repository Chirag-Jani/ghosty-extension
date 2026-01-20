import { ArrowDownLeft, ArrowLeft, ArrowUpRight, Globe, Shield } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ActivityFilter = 'all' | 'connections' | 'transfers';

const History = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<ActivityFilter>('all');

  // Mock Data - updated for new model
  const history = [
    { 
      id: 1, 
      type: 'connection', 
      site: 'raydium.io',
      burner: '8xzt...9jLk',
      time: '2 mins ago', 
      status: 'Active'
    },
    { 
      id: 2, 
      type: 'receive', 
      amount: '2.5 SOL', 
      site: 'raydium.io',
      burner: '8xzt...9jLk',
      time: '5 mins ago', 
      status: 'Received'
    },
    { 
      id: 3, 
      type: 'migrate', 
      amount: '1.8 SOL', 
      from: 'F7ka...2mNp',
      to: 'Privacy Cash',
      time: '1 hour ago', 
      status: 'Completed'
    },
    { 
      id: 4, 
      type: 'connection', 
      site: 'jupiter.ag',
      burner: 'F7ka...2mNp',
      time: '2 hours ago', 
      status: 'Disconnected'
    },
    { 
      id: 5, 
      type: 'receive', 
      amount: '100 USDC', 
      site: 'tensor.trade',
      burner: 'Hq3m...7vRt',
      time: '3 hours ago', 
      status: 'Received'
    },
    { 
      id: 6, 
      type: 'retired', 
      burner: 'Ab2k...4pQr',
      site: 'phantom.app',
      time: '1 day ago', 
      status: 'Retired'
    },
  ];

  const filteredHistory = history.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'connections') return tx.type === 'connection' || tx.type === 'retired';
    if (filter === 'transfers') return tx.type === 'receive' || tx.type === 'migrate';
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'connection':
        return <Globe className="w-4 h-4" />;
      case 'receive':
        return <ArrowDownLeft className="w-4 h-4" />;
      case 'migrate':
        return <Shield className="w-4 h-4" />;
      case 'retired':
        return <ArrowUpRight className="w-4 h-4" />;
      default:
        return <ArrowDownLeft className="w-4 h-4" />;
    }
  };

  const getIconStyle = (type: string) => {
    switch (type) {
      case 'connection':
        return 'bg-blue-500/10 text-blue-400';
      case 'receive':
        return 'bg-green-500/10 text-green-400';
      case 'migrate':
        return 'bg-purple-500/10 text-purple-400';
      case 'retired':
        return 'bg-gray-500/10 text-gray-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getTitle = (tx: typeof history[0]) => {
    switch (tx.type) {
      case 'connection':
        return `Connected to ${tx.site}`;
      case 'receive':
        return `Received on ${tx.site}`;
      case 'migrate':
        return 'Migrated to Privacy Cash';
      case 'retired':
        return `Burner retired`;
      default:
        return 'Activity';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-400';
      case 'Completed':
        return 'text-purple-400';
      case 'Received':
        return 'text-green-400';
      case 'Disconnected':
        return 'text-gray-500';
      case 'Retired':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="h-full w-full bg-black text-white p-5 relative flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </button>
        <h1 className="text-xl font-bold">Activity</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'connections', 'transfers'] as ActivityFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === f
                ? 'bg-white text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-3 flex-1 overflow-y-auto">
        {filteredHistory.map((tx) => (
          <div key={tx.id} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-full ${getIconStyle(tx.type)}`}>
                {getIcon(tx.type)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200">{getTitle(tx)}</p>
                <p className="text-xs text-gray-600 font-mono mt-0.5">
                  {tx.burner || tx.from}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{tx.time}</p>
              </div>
            </div>
            <div className="text-right">
              {tx.amount && (
                <p className={`text-sm font-bold ${tx.type === 'receive' ? 'text-green-400' : 'text-gray-300'}`}>
                  {tx.type === 'receive' ? '+' : '-'}{tx.amount}
                </p>
              )}
              <p className={`text-[10px] uppercase tracking-wide ${getStatusStyle(tx.status)}`}>
                {tx.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredHistory.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600 text-sm">No activity to show</p>
        </div>
      )}
    </div>
  );
};

export default History;
