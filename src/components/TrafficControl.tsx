import React, { useState } from 'react';
import { 
  Train, 
  AlertTriangle, 
  Clock, 
  Users, 
  Signal, 
  MapPin,
  TrendingUp,
  Brain,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';
import { mockTrains, mockSections, mockTrafficControllers } from '../data/mockData';

const TrafficControl: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState<string>('');
  const [aiMode, setAiMode] = useState<boolean>(true);

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'text-red-600 bg-red-100';
    if (priority >= 6) return 'text-orange-600 bg-orange-100';
    if (priority >= 4) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrainTypeIcon = (type: string) => {
    switch (type) {
      case 'superfast': return '🚄';
      case 'express': return '🚅';
      case 'freight': return '🚂';
      case 'passenger': return '🚃';
      case 'local': return '🚇';
      default: return '🚆';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Traffic Control Center</h1>
          <p className="text-gray-600">Maximizing section throughput with precise train traffic control</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setAiMode(!aiMode)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              aiMode ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>{aiMode ? 'AI Mode Active' : 'Manual Mode'}</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Emergency Override
          </button>
        </div>
      </div>

      {/* AI Status Banner */}
      {aiMode && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-blue-800 font-medium">AI Traffic Optimization Active</p>
                <p className="text-blue-600 text-sm">Processing 847 data points per second • 94.2% accuracy</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">+23.7%</p>
              <p className="text-sm text-blue-700">Throughput Increase</p>
            </div>
          </div>
        </div>
      )}

      {/* Section Throughput Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Train className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12.3%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">47</h3>
            <p className="text-gray-600 text-sm">Trains/Hour Throughput</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Signal className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+8.7%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">2.3min</h3>
            <p className="text-gray-600 text-sm">Avg Headway Time</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+15.2%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">91.8%</h3>
            <p className="text-gray-600 text-sm">Section Utilization</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-red-600 font-medium">-34.5%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">1.2min</h3>
            <p className="text-gray-600 text-sm">Avg Delay Reduced</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Trains Control Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Active Train Control</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Real-time tracking</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockTrains.map((train) => (
                <div 
                  key={train.id} 
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedTrain === train.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTrain(train.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{getTrainTypeIcon(train.trainType)}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{train.name}</h3>
                          <span className="text-sm text-gray-600">({train.trainNumber})</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(train.priority)}`}>
                            P{train.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{train.currentSection} → {train.nextSection}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className={`w-4 h-4 rounded-full ${getSignalColor(train.signalStatus)} mx-auto mb-1`}></div>
                        <span className="text-xs text-gray-600">Signal</span>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{train.speed}</div>
                        <div className="text-xs text-gray-600">km/h</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{train.headwayTime}</div>
                        <div className="text-xs text-gray-600">min</div>
                      </div>
                    </div>
                  </div>

                  {selectedTrain === train.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Current Status</p>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Block Section: {train.blockSection}</p>
                            <p>Platform: {train.platformAssigned}</p>
                            <p>Max Speed: {train.maxSpeed} km/h</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">AI Recommendations</p>
                          <div className="space-y-2">
                            <button className="w-full bg-green-100 text-green-800 py-2 px-3 rounded text-sm hover:bg-green-200 transition-colors">
                              Proceed - Clear Section
                            </button>
                            <button className="w-full bg-yellow-100 text-yellow-800 py-2 px-3 rounded text-sm hover:bg-yellow-200 transition-colors">
                              Hold - Traffic Ahead
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Capacity Monitor */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Section Capacity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockSections.map((section) => (
                <div key={section.id} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{section.name}</h3>
                    <span className="text-sm text-gray-600">{section.trackType}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Occupancy</span>
                      <span className="font-medium">{section.currentOccupancy}/{section.maxCapacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          (section.currentOccupancy / section.maxCapacity) > 0.8 ? 'bg-red-500' :
                          (section.currentOccupancy / section.maxCapacity) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(section.currentOccupancy / section.maxCapacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>Length: {section.length} km</div>
                    <div>Max: {section.maxSpeed} km/h</div>
                    <div>System: {section.signallingSystem}</div>
                    <div>Safety: {section.safetyMargin} min</div>
                  </div>

                  {section.conflictPoints && section.conflictPoints.length > 0 && (
                    <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3 text-yellow-600" />
                        <span className="text-xs text-yellow-800">Conflict Points: {section.conflictPoints.join(', ')}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Decision Support */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">AI Decision Support System</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Real-time Optimization</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Priority Override Applied</p>
                      <p className="text-xs text-green-600">Rajdhani Express given clear path</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600">2 min ago</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Dynamic Rescheduling</p>
                      <p className="text-xs text-blue-600">3 freight trains rerouted for efficiency</p>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600">5 min ago</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Conflict Resolution</p>
                      <p className="text-xs text-yellow-600">Junction timing optimized</p>
                    </div>
                  </div>
                  <span className="text-xs text-yellow-600">8 min ago</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Controller Performance</h3>
              <div className="space-y-3">
                {mockTrafficControllers.map((controller) => (
                  <div key={controller.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{controller.name}</p>
                        <p className="text-sm text-gray-600">{controller.section}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{controller.experience} years</p>
                        <p className="text-xs text-gray-600">Load: {controller.currentLoad}/10</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(controller.currentLoad / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">AI Sync: 94%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficControl;