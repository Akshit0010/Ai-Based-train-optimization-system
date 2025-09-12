import React from 'react';
import { Zap, Battery, Leaf, TrendingDown, BarChart3, Settings } from 'lucide-react';
import { mockTrains } from '../data/mockData';

const EnergyManagement: React.FC = () => {
  const totalEnergyConsumption = 2847;
  const energyEfficiency = 91.8;
  const carbonReduction = 23.7;
  const costSavings = 12450;

  const energyData = [
    { label: 'Traction Systems', value: 65, color: 'bg-blue-500' },
    { label: 'Auxiliary Systems', value: 20, color: 'bg-green-500' },
    { label: 'HVAC', value: 10, color: 'bg-yellow-500' },
    { label: 'Lighting', value: 5, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Energy Management</h1>
          <p className="text-gray-600">Real-time energy monitoring and optimization</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Leaf className="w-4 h-4" />
            <span>Eco Mode</span>
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">-5.2%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{totalEnergyConsumption}</h3>
            <p className="text-gray-600 text-sm">kWh Today</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Battery className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+2.1%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{energyEfficiency}%</h3>
            <p className="text-gray-600 text-sm">Efficiency Score</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12.3%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{carbonReduction}%</h3>
            <p className="text-gray-600 text-sm">Carbon Reduction</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+8.7%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">${costSavings}</h3>
            <p className="text-gray-600 text-sm">Cost Savings</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Energy Distribution</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {energyData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <span className="text-sm text-gray-900">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Train Energy Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Train Energy Status</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockTrains.map((train) => (
                <div key={train.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      train.energyEfficiency > 90 ? 'bg-green-500' :
                      train.energyEfficiency > 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <h3 className="font-medium text-gray-900">{train.name}</h3>
                      <p className="text-sm text-gray-600">{train.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{train.energyEfficiency}%</div>
                    <div className="text-sm text-gray-600">Efficiency</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">AI Optimization Recommendations</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Immediate Actions</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Regenerative Braking Optimization</p>
                    <p className="text-xs text-green-600">Increase energy recovery by 8-12% on downhill sections</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">HVAC Schedule Adjustment</p>
                    <p className="text-xs text-blue-600">Reduce energy consumption during low-passenger periods</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Speed Profile Optimization</p>
                    <p className="text-xs text-yellow-600">Adjust acceleration patterns for 5% energy savings</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Long-term Strategies</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-purple-800">Battery Storage Integration</p>
                    <p className="text-xs text-purple-600">Peak shaving potential: 15-20% cost reduction</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Solar Panel Installation</p>
                    <p className="text-xs text-emerald-600">Renewable energy coverage: up to 30% of consumption</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-red-800">Smart Grid Integration</p>
                    <p className="text-xs text-red-600">Dynamic pricing optimization for off-peak charging</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyManagement;