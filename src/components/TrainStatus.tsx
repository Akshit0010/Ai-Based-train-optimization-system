import React from 'react';
import { Train, MapPin, Users, Zap, Clock, AlertCircle } from 'lucide-react';
import { mockTrains } from '../data/mockData';

const TrainStatus: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-green-600 bg-green-100';
      case 'delayed':
        return 'text-yellow-600 bg-yellow-100';
      case 'maintenance':
        return 'text-red-600 bg-red-100';
      case 'stopped':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return '🟢';
      case 'delayed':
        return '🟡';
      case 'maintenance':
        return '🔴';
      case 'stopped':
        return '⚫';
      default:
        return '⚫';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Train Status</h1>
          <p className="text-gray-600">Real-time monitoring of all active trains</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Optimize All
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockTrains.map((train) => (
          <div key={train.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Train className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{train.name}</h3>
                    <p className="text-sm text-gray-600">{train.route}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(train.status)}`}>
                  {getStatusIcon(train.status)} {train.status.charAt(0).toUpperCase() + train.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Current Location</p>
                      <p className="font-medium text-gray-900">{train.currentStation}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Next Arrival</p>
                      <p className="font-medium text-gray-900">{train.estimatedArrival}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Passengers</p>
                      <p className="font-medium text-gray-900">{train.passengers}/{train.capacity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Efficiency</p>
                      <p className="font-medium text-gray-900">{train.energyEfficiency}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{train.speed}</p>
                      <p className="text-sm text-gray-600">km/h</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${train.delay > 0 ? 'text-red-600' : train.delay < 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        {train.delay > 0 ? '+' : ''}{train.delay}
                      </p>
                      <p className="text-sm text-gray-600">min delay</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </button>
                    <button className="bg-gray-50 text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {train.status === 'delayed' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                      Train is experiencing delays due to signal interference. AI optimization in progress.
                    </p>
                  </div>
                </div>
              )}

              {train.status === 'maintenance' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <p className="text-sm text-red-800">
                      Scheduled maintenance in progress. Estimated completion: 15:45
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Progress bar for capacity */}
            <div className="px-6 pb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Capacity</span>
                <span>{Math.round((train.passengers / train.capacity) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    (train.passengers / train.capacity) > 0.8 ? 'bg-red-500' :
                    (train.passengers / train.capacity) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(train.passengers / train.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainStatus;