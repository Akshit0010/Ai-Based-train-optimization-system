import React from 'react';
import { 
  Train, 
  BarChart3, 
  Route, 
  Zap, 
  AlertTriangle, 
  Settings,
  Home,
  Radio,
  BarChart2,
  Plus,
  Map,
  FileText
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'trains', label: 'Train Status', icon: Train },
    { id: 'add-train', label: 'Add New Train', icon: Plus },
    { id: 'track-visualization', label: 'Track Visualization', icon: Map },
    { id: 'traffic-control', label: 'Traffic Control', icon: Radio },
    { id: 'throughput', label: 'Section Throughput', icon: BarChart2 },
    { id: 'routes', label: 'Route Optimization', icon: Route },
    { id: 'energy', label: 'Energy Management', icon: Zap },
    { id: 'reports', label: 'Automated Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-full flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Train className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">TrainAI</h1>
            <p className="text-gray-400 text-sm">Optimization System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">System Online</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">AI Engine Active</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;