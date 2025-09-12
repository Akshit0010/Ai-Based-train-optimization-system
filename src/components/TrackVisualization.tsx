import React, { useState, useEffect } from 'react';
import { 
  Train, 
  MapPin, 
  Signal, 
  Clock, 
  Zap,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Settings
} from 'lucide-react';

interface TrainPosition {
  id: string;
  name: string;
  trainNumber: string;
  type: 'express' | 'passenger' | 'freight' | 'superfast';
  line: 'up' | 'down';
  position: number; // 0-100 percentage along track
  speed: number;
  direction: 'forward' | 'backward';
  status: 'running' | 'stopped' | 'approaching';
  nextStation: string;
  signalStatus: 'green' | 'yellow' | 'red';
  priority: number;
}

interface Station {
  id: string;
  name: string;
  position: number; // 0-100 percentage along track
  platforms: number;
  type: 'major' | 'junction' | 'halt';
}

interface Signal {
  id: string;
  position: number;
  status: 'green' | 'yellow' | 'red';
  type: 'home' | 'distant' | 'routing';
}

const TrackVisualization: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedTrain, setSelectedTrain] = useState<string>('');
  const [showDetails, setShowDetails] = useState(true);

  // Track stations along 50km double line
  const stations: Station[] = [
    { id: 'st1', name: 'Central Station', position: 0, platforms: 6, type: 'major' },
    { id: 'st2', name: 'Tech District', position: 15, platforms: 4, type: 'junction' },
    { id: 'st3', name: 'Business Park', position: 30, platforms: 2, type: 'halt' },
    { id: 'st4', name: 'Innovation Hub', position: 45, platforms: 3, type: 'junction' },
    { id: 'st5', name: 'University', position: 65, platforms: 2, type: 'halt' },
    { id: 'st6', name: 'Medical Center', position: 80, platforms: 4, type: 'major' },
    { id: 'st7', name: 'North Terminal', position: 100, platforms: 8, type: 'major' }
  ];

  // Signal positions
  const signals: Signal[] = [
    { id: 'sig1', position: 8, status: 'green', type: 'home' },
    { id: 'sig2', position: 22, status: 'yellow', type: 'distant' },
    { id: 'sig3', position: 38, status: 'green', type: 'routing' },
    { id: 'sig4', position: 52, status: 'green', type: 'home' },
    { id: 'sig5', position: 72, status: 'red', type: 'distant' },
    { id: 'sig6', position: 88, status: 'green', type: 'routing' }
  ];

  const [trains, setTrains] = useState<TrainPosition[]>([
    {
      id: 'train1',
      name: 'Rajdhani Express',
      trainNumber: '12001',
      type: 'superfast',
      line: 'up',
      position: 25,
      speed: 95,
      direction: 'forward',
      status: 'running',
      nextStation: 'Business Park',
      signalStatus: 'green',
      priority: 9
    },
    {
      id: 'train2',
      name: 'Passenger Local',
      trainNumber: '56001',
      type: 'passenger',
      line: 'down',
      position: 70,
      speed: 45,
      direction: 'backward',
      status: 'approaching',
      nextStation: 'Innovation Hub',
      signalStatus: 'yellow',
      priority: 5
    }
  ]);

  // Animation loop for moving trains
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTrains(prevTrains => 
        prevTrains.map(train => {
          let newPosition = train.position;
          const moveSpeed = (train.speed / 100) * speed * 0.5; // Adjust speed for visualization

          if (train.direction === 'forward') {
            newPosition += moveSpeed;
            if (newPosition >= 100) {
              newPosition = 100;
              // Train reached end, could reverse or stop
            }
          } else {
            newPosition -= moveSpeed;
            if (newPosition <= 0) {
              newPosition = 0;
              // Train reached start, could reverse or stop
            }
          }

          // Check for station proximity
          const nearStation = stations.find(station => 
            Math.abs(station.position - newPosition) < 3
          );

          return {
            ...train,
            position: newPosition,
            status: nearStation ? 'approaching' : 'running',
            nextStation: nearStation ? nearStation.name : train.nextStation
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const getTrainIcon = (type: string) => {
    switch (type) {
      case 'superfast': return '🚄';
      case 'express': return '🚅';
      case 'passenger': return '🚃';
      case 'freight': return '🚂';
      default: return '🚆';
    }
  };

  const getSignalColor = (status: string) => {
    switch (status) {
      case 'green': return '#10B981';
      case 'yellow': return '#F59E0B';
      case 'red': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStationSize = (type: string) => {
    switch (type) {
      case 'major': return 'w-4 h-4';
      case 'junction': return 'w-3 h-3';
      case 'halt': return 'w-2 h-2';
      default: return 'w-2 h-2';
    }
  };

  const resetSimulation = () => {
    setTrains([
      {
        id: 'train1',
        name: 'Rajdhani Express',
        trainNumber: '12001',
        type: 'superfast',
        line: 'up',
        position: 5,
        speed: 95,
        direction: 'forward',
        status: 'running',
        nextStation: 'Tech District',
        signalStatus: 'green',
        priority: 9
      },
      {
        id: 'train2',
        name: 'Passenger Local',
        trainNumber: '56001',
        type: 'passenger',
        line: 'down',
        position: 85,
        speed: 45,
        direction: 'backward',
        status: 'running',
        nextStation: 'Medical Center',
        signalStatus: 'green',
        priority: 5
      }
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enhanced Track Visualization</h1>
          <p className="text-gray-600">50km Double Line with Real-time Train Movement</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              isPlaying ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={resetSimulation}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Simulation Controls</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Speed:</label>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={5}>5x</option>
              </select>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">50km</div>
            <div className="text-sm text-blue-700">Track Length</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{trains.length}</div>
            <div className="text-sm text-green-700">Active Trains</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stations.length}</div>
            <div className="text-sm text-purple-700">Stations</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{signals.length}</div>
            <div className="text-sm text-orange-700">Signals</div>
          </div>
        </div>
      </div>

      {/* Track Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Live Track View</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-1 bg-gray-800 rounded"></div>
              <span>Up Line</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-1 bg-gray-600 rounded"></div>
              <span>Down Line</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Major Station</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Signal Green</span>
            </div>
          </div>
        </div>

        {/* Track Container */}
        <div className="relative bg-gray-100 rounded-lg p-8 min-h-[400px]">
          {/* Distance Markers */}
          <div className="absolute top-4 left-8 right-8 flex justify-between text-xs text-gray-500">
            <span>0 km</span>
            <span>12.5 km</span>
            <span>25 km</span>
            <span>37.5 km</span>
            <span>50 km</span>
          </div>

          {/* Up Line Track */}
          <div className="absolute top-20 left-8 right-8 h-2 bg-gray-800 rounded-full">
            {/* Stations on Up Line */}
            {stations.map(station => (
              <div
                key={`up-${station.id}`}
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{ left: `${station.position}%` }}
              >
                <div className={`${getStationSize(station.type)} bg-blue-500 rounded-full -mt-1`}></div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 whitespace-nowrap">
                  {station.name}
                </div>
              </div>
            ))}

            {/* Signals on Up Line */}
            {signals.map(signal => (
              <div
                key={`up-${signal.id}`}
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{ left: `${signal.position}%` }}
              >
                <div 
                  className="w-2 h-4 rounded-sm -mt-2"
                  style={{ backgroundColor: getSignalColor(signal.status) }}
                ></div>
              </div>
            ))}

            {/* Trains on Up Line */}
            {trains.filter(train => train.line === 'up').map(train => (
              <div
                key={`up-${train.id}`}
                className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer transition-all duration-100"
                style={{ left: `${train.position}%` }}
                onClick={() => setSelectedTrain(train.id)}
              >
                <div className={`text-2xl -mt-4 ${selectedTrain === train.id ? 'scale-125' : ''} transition-transform`}>
                  {getTrainIcon(train.type)}
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  <div className="font-medium">{train.name}</div>
                  <div className="text-gray-600">{train.speed} km/h</div>
                </div>
              </div>
            ))}
          </div>

          {/* Down Line Track */}
          <div className="absolute top-32 left-8 right-8 h-2 bg-gray-600 rounded-full">
            {/* Stations on Down Line */}
            {stations.map(station => (
              <div
                key={`down-${station.id}`}
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{ left: `${station.position}%` }}
              >
                <div className={`${getStationSize(station.type)} bg-blue-500 rounded-full -mt-1`}></div>
              </div>
            ))}

            {/* Signals on Down Line */}
            {signals.map(signal => (
              <div
                key={`down-${signal.id}`}
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{ left: `${signal.position}%` }}
              >
                <div 
                  className="w-2 h-4 rounded-sm -mt-2"
                  style={{ backgroundColor: getSignalColor(signal.status) }}
                ></div>
              </div>
            ))}

            {/* Trains on Down Line */}
            {trains.filter(train => train.line === 'down').map(train => (
              <div
                key={`down-${train.id}`}
                className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer transition-all duration-100"
                style={{ left: `${train.position}%` }}
                onClick={() => setSelectedTrain(train.id)}
              >
                <div className={`text-2xl -mt-4 ${selectedTrain === train.id ? 'scale-125' : ''} transition-transform`}>
                  {getTrainIcon(train.type)}
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  <div className="font-medium">{train.name}</div>
                  <div className="text-gray-600">{train.speed} km/h</div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-8 right-8">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🚄</span>
                  <span>Superfast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🚅</span>
                  <span>Express</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🚃</span>
                  <span>Passenger</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🚂</span>
                  <span>Freight</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Train Details Panel */}
      {showDetails && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trains.map(train => (
            <div key={train.id} className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
              selectedTrain === train.id ? 'border-blue-500' : 'border-gray-200'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{getTrainIcon(train.type)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{train.name}</h3>
                      <p className="text-sm text-gray-600">{train.trainNumber} • {train.line.toUpperCase()} Line</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    train.signalStatus === 'green' ? 'bg-green-500' :
                    train.signalStatus === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Speed</p>
                        <p className="font-medium text-gray-900">{train.speed} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Position</p>
                        <p className="font-medium text-gray-900">{(train.position * 0.5).toFixed(1)} km</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-medium text-gray-900 capitalize">{train.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Train className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Next Station</p>
                        <p className="font-medium text-gray-900">{train.nextStation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Priority Level</span>
                    <span className="font-medium text-gray-900">P{train.priority}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${(train.priority / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackVisualization;