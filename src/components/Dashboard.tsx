import React from 'react';
import { Train, Clock, Zap, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { mockAnalytics, mockTrains, mockAlerts } from '../data/mockData';

const Dashboard: React.FC = () => {
  const runningTrains = mockTrains.filter(train => train.status === 'running').length;
  const activeAlerts = mockAlerts.filter(alert => !alert.resolved).length;

  const stats = [
    {
      title: 'Active Trains',
      value: runningTrains,
      total: mockAnalytics.totalTrains,
      icon: Train,
      color: 'blue',
      change: '+2.1%'
    },
    {
      title: 'On-Time Performance',
      value: `${mockAnalytics.onTimePerformance}%`,
      icon: Clock,
      color: 'green',
      change: '+1.2%'
    },
    {
      title: 'Energy Efficiency',
      value: `${mockAnalytics.energyEfficiency}%`,
      icon: Zap,
      color: 'yellow',
      change: '+0.8%'
    },
    {
      title: 'Passenger Satisfaction',
      value: mockAnalytics.passengerSatisfaction.toFixed(1),
      icon: Users,
      color: 'purple',
      change: '+0.3%'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-100',
      green: 'bg-green-500 text-green-100',
      yellow: 'bg-yellow-500 text-yellow-100',
      purple: 'bg-purple-500 text-purple-100'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Indian Railways AI Control Center</h1>
          <p className="text-gray-600">Maximizing section throughput with precise train traffic control</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            AI Traffic Optimization
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            System Report
          </button>
        </div>
      </div>

      {/* AI Status Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-blue-800 font-medium">AI Traffic Control System Active</p>
              <p className="text-blue-600 text-sm">Processing real-time data from 247 sections • 96.3% efficiency</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">+27.3%</p>
            <p className="text-sm text-green-700">Throughput Increase</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg ${getColorClasses(stat.color)} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-green-600 font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                  {stat.total && <span className="text-lg text-gray-500">/{stat.total}</span>}
                </h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Train Status */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Active Trains</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockTrains.slice(0, 4).map((train) => (
                <div key={train.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      train.status === 'running' ? 'bg-green-500' :
                      train.status === 'delayed' ? 'bg-yellow-500' :
                      train.status === 'maintenance' ? 'bg-red-500' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <h3 className="font-medium text-gray-900">{train.name}</h3>
                      <p className="text-sm text-gray-600">{train.currentStation} → {train.nextStation}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {train.speed} km/h
                    </div>
                    <div className="text-sm text-gray-600">
                      {train.passengers}/{train.capacity} passengers
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
              {activeAlerts > 0 && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  {activeAlerts} active
                </span>
              )}
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === 'high' ? 'bg-red-50 border-red-400' :
                  alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${
                      alert.severity === 'high' ? 'text-red-500' :
                      alert.severity === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{mockAnalytics.onTimePerformance}%</div>
              <div className="text-sm text-gray-600">On-Time Performance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{mockAnalytics.energyEfficiency}%</div>
              <div className="text-sm text-gray-600">Energy Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{mockAnalytics.passengerSatisfaction}</div>
              <div className="text-sm text-gray-600">Satisfaction Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{mockAnalytics.averageDelay}min</div>
              <div className="text-sm text-gray-600">Average Delay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;