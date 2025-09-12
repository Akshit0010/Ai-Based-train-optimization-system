import React, { useState } from 'react';
import { Route, Navigation, Clock, Zap, TrendingUp, Play, Pause } from 'lucide-react';
import { mockRoutes } from '../data/mockData';

const RouteOptimization: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [optimizationRunning, setOptimizationRunning] = useState<boolean>(false);

  const getTrafficColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleOptimizeRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    setOptimizationRunning(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setOptimizationRunning(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Route Optimization</h1>
          <p className="text-gray-600">AI-powered route planning and traffic management</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => handleOptimizeRoute('all')}
            disabled={optimizationRunning}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {optimizationRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{optimizationRunning ? 'Optimizing...' : 'Optimize All Routes'}</span>
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Optimization Status */}
      {optimizationRunning && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <div>
              <p className="text-blue-800 font-medium">AI Optimization in Progress</p>
              <p className="text-blue-600 text-sm">Analyzing traffic patterns and calculating optimal routes...</p>
            </div>
          </div>
        </div>
      )}

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockRoutes.map((route) => (
          <div key={route.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Route className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                    <p className="text-sm text-gray-600">{route.stations.length} stations</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTrafficColor(route.trafficLevel)}`}>
                  {route.trafficLevel} traffic
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Distance</span>
                  </div>
                  <span className="font-medium text-gray-900">{route.distance} km</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Est. Time</span>
                  </div>
                  <span className="font-medium text-gray-900">{route.estimatedTime} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Energy</span>
                  </div>
                  <span className="font-medium text-gray-900">{route.energyConsumption} kWh</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Route Stations</p>
                  <div className="space-y-1">
                    {route.stations.map((station, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          index === 0 ? 'bg-green-500' : 
                          index === route.stations.length - 1 ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                        <span className="text-sm text-gray-600">{station}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => handleOptimizeRoute(route.id)}
                  disabled={optimizationRunning && selectedRoute === route.id}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {optimizationRunning && selectedRoute === route.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Optimizing...</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4" />
                      <span>Optimize Route</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optimization Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Optimization Results</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">12.5%</div>
              <div className="text-sm text-green-700 mt-1">Energy Savings</div>
              <div className="text-xs text-gray-600 mt-2">vs. previous routes</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">8.2min</div>
              <div className="text-sm text-blue-700 mt-1">Time Reduced</div>
              <div className="text-xs text-gray-600 mt-2">average per route</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">94.7%</div>
              <div className="text-sm text-purple-700 mt-1">Efficiency Score</div>
              <div className="text-xs text-gray-600 mt-2">AI recommendation</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Latest Optimization Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Redirect Express Alpha to avoid high-traffic Central District during peak hours</li>
              <li>• Implement dynamic speed adjustments on West-Downtown Express for energy efficiency</li>
              <li>• Schedule maintenance windows during low-passenger periods on South-East Corridor</li>
              <li>• Optimize signal timing on North Loop to reduce average waiting time by 15%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimization;