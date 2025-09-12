import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Train, 
  AlertCircle,
  Target,
  Zap,
  Activity
} from 'lucide-react';

const SectionThroughput: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('hour');

  const throughputData = [
    { section: 'Central-North', current: 47, target: 52, efficiency: 90.4, bottleneck: false },
    { section: 'South-East', current: 38, target: 45, efficiency: 84.4, bottleneck: true },
    { section: 'West-Downtown', current: 42, target: 48, efficiency: 87.5, bottleneck: false },
    { section: 'Suburban Circle', current: 35, target: 40, efficiency: 87.5, bottleneck: false },
  ];

  const optimizationMetrics = [
    { metric: 'Headway Optimization', improvement: '+23.7%', status: 'active' },
    { metric: 'Signal Coordination', improvement: '+18.2%', status: 'active' },
    { metric: 'Priority Scheduling', improvement: '+15.8%', status: 'active' },
    { metric: 'Conflict Resolution', improvement: '+12.4%', status: 'active' },
  ];

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600 bg-green-100';
    if (efficiency >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Section Throughput Analysis</h1>
          <p className="text-gray-600">AI-powered optimization for maximum railway capacity utilization</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="hour">Last Hour</option>
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Optimize All Sections
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Train className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+15.3%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">162</h3>
            <p className="text-gray-600 text-sm">Total Trains/Hour</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+8.7%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">87.4%</h3>
            <p className="text-gray-600 text-sm">Avg Section Efficiency</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-red-600 font-medium">-34.2%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">2.1min</h3>
            <p className="text-gray-600 text-sm">Avg Headway Time</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12.8%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">94.2%</h3>
            <p className="text-gray-600 text-sm">Network Utilization</p>
          </div>
        </div>
      </div>

      {/* Section Performance Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Section Performance Analysis</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Real-time monitoring</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {throughputData.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{section.section}</h3>
                    {section.bottleneck && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Bottleneck
                      </span>
                    )}
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getEfficiencyColor(section.efficiency)}`}>
                    {section.efficiency}% Efficient
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current Throughput</span>
                      <span className="text-2xl font-bold text-gray-900">{section.current}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Target Capacity</span>
                      <span className="text-lg font-semibold text-gray-700">{section.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          (section.current / section.target) > 0.9 ? 'bg-green-500' :
                          (section.current / section.target) > 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(section.current / section.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">AI Recommendations</h4>
                    <div className="space-y-2 text-sm">
                      {section.bottleneck ? (
                        <>
                          <div className="flex items-center space-x-2 text-red-700">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>Reduce signal dwell time by 15s</span>
                          </div>
                          <div className="flex items-center space-x-2 text-orange-700">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span>Implement dynamic block spacing</span>
                          </div>
                          <div className="flex items-center space-x-2 text-yellow-700">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span>Priority lane for express trains</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center space-x-2 text-green-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Maintain current optimization</span>
                          </div>
                          <div className="flex items-center space-x-2 text-blue-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Fine-tune headway intervals</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg Delay</span>
                        <span className="font-medium">1.2 min</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Peak Utilization</span>
                        <span className="font-medium">96.3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Energy Efficiency</span>
                        <span className="font-medium">89.7%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optimization Impact */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            <h2 className="text-xl font-semibold text-gray-900">AI Optimization Impact</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {optimizationMetrics.map((metric, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{metric.metric}</h3>
                <div className="text-2xl font-bold text-green-600 mb-1">{metric.improvement}</div>
                <div className="text-sm text-gray-600">vs. manual control</div>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {metric.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Overall System Performance</h3>
                <p className="text-gray-600 mt-1">AI optimization has significantly improved network efficiency</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">+27.3%</div>
                <div className="text-sm text-gray-600">Total Throughput Increase</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-blue-600">847</div>
                <div className="text-sm text-gray-600">Data Points/sec</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600">94.2%</div>
                <div className="text-sm text-gray-600">AI Accuracy</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">₹2.3Cr</div>
                <div className="text-sm text-gray-600">Monthly Savings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionThroughput;