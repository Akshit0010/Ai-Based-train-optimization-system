import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TrainStatus from './components/TrainStatus';
import AddTrain from './components/AddTrain';
import TrackVisualization from './components/TrackVisualization';
import RouteOptimization from './components/RouteOptimization';
import EnergyManagement from './components/EnergyManagement';
import TrafficControl from './components/TrafficControl';
import SectionThroughput from './components/SectionThroughput';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'trains':
        return <TrainStatus />;
      case 'add-train':
        return <AddTrain />;
      case 'track-visualization':
        return <TrackVisualization />;
      case 'traffic-control':
        return <TrafficControl />;
      case 'throughput':
        return <SectionThroughput />;
      case 'routes':
        return <RouteOptimization />;
      case 'energy':
        return <EnergyManagement />;
      case 'analytics':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
              <p className="text-gray-600">Advanced analytics and reporting coming soon...</p>
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Alert Management</h2>
              <p className="text-gray-600">Comprehensive alert system coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h2>
              <p className="text-gray-600">Configuration panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;