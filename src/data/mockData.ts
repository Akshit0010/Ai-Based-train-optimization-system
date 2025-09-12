import { Train, Route, Schedule, Alert, Analytics } from '../types';

export const mockTrains: Train[] = [
  {
    id: '1',
    name: 'Rajdhani Express',
    trainNumber: '12001',
    trainType: 'superfast',
    priority: 9,
    route: 'Central-North Loop',
    status: 'running',
    currentStation: 'Central Station',
    nextStation: 'Tech District',
    currentSection: 'SEC-001',
    nextSection: 'SEC-002',
    speed: 85,
    maxSpeed: 130,
    capacity: 300,
    passengers: 245,
    energyEfficiency: 92,
    estimatedArrival: '14:25',
    delay: 0,
    position: { lat: 40.7589, lng: -73.9851 },
    platformAssigned: 'Platform 1',
    signalStatus: 'green',
    blockSection: 'BLK-A1',
    headwayTime: 3
  },
  {
    id: '2',
    name: 'Shatabdi Express',
    trainNumber: '12002',
    trainType: 'express',
    priority: 8,
    route: 'South-East Corridor',
    status: 'delayed',
    currentStation: 'Business Park',
    nextStation: 'University',
    currentSection: 'SEC-003',
    nextSection: 'SEC-004',
    speed: 45,
    maxSpeed: 110,
    capacity: 250,
    passengers: 189,
    energyEfficiency: 87,
    estimatedArrival: '14:32',
    delay: 7,
    position: { lat: 40.7505, lng: -73.9934 },
    platformAssigned: 'Platform 3',
    signalStatus: 'yellow',
    blockSection: 'BLK-B2',
    headwayTime: 5
  },
  {
    id: '3',
    name: 'Freight Express',
    trainNumber: '52001',
    trainType: 'freight',
    priority: 4,
    route: 'West-Downtown Express',
    status: 'running',
    currentStation: 'Arts Quarter',
    nextStation: 'Financial District',
    currentSection: 'SEC-005',
    nextSection: 'SEC-006',
    speed: 95,
    maxSpeed: 100,
    capacity: 280,
    passengers: 267,
    energyEfficiency: 95,
    estimatedArrival: '14:18',
    delay: -2,
    position: { lat: 40.7614, lng: -73.9776 },
    platformAssigned: 'Platform 2',
    signalStatus: 'green',
    blockSection: 'BLK-C1',
    headwayTime: 8
  },
  {
    id: '4',
    name: 'Passenger Local',
    trainNumber: '56001',
    trainType: 'passenger',
    priority: 3,
    route: 'Suburban Circle',
    status: 'maintenance',
    currentStation: 'Maintenance Yard',
    nextStation: 'Suburban West',
    currentSection: 'SEC-007',
    nextSection: 'SEC-008',
    speed: 0,
    maxSpeed: 80,
    capacity: 200,
    passengers: 0,
    energyEfficiency: 0,
    estimatedArrival: '15:45',
    delay: 0,
    position: { lat: 40.7282, lng: -73.9942 },
    platformAssigned: 'Yard-1',
    signalStatus: 'red',
    blockSection: 'BLK-YARD',
    headwayTime: 0
  }
];

export const mockRoutes: Route[] = [
  {
    id: '1',
    name: 'Central-North Loop',
    stations: ['Central Station', 'Tech District', 'Innovation Hub', 'North Terminal'],
    distance: 45.2,
    estimatedTime: 35,
    trafficLevel: 'medium',
    energyConsumption: 245,
    maxTrainsPerHour: 12,
    currentThroughput: 8,
    sections: [
      {
        id: 'SEC-001',
        name: 'Central-Tech Section',
        startStation: 'Central Station',
        endStation: 'Tech District',
        length: 15.2,
        maxSpeed: 130,
        signallingSystem: 'automatic',
        trackType: 'double',
        currentOccupancy: 2,
        maxCapacity: 4,
        safetyMargin: 2.5,
        conflictPoints: ['Junction-A', 'Level-Crossing-1']
      }
    ]
  },
  {
    id: '2',
    name: 'South-East Corridor',
    stations: ['Business Park', 'University', 'Medical Center', 'East Station'],
    distance: 38.7,
    estimatedTime: 42,
    trafficLevel: 'high',
    energyConsumption: 298,
    maxTrainsPerHour: 8,
    currentThroughput: 7,
    sections: [
      {
        id: 'SEC-003',
        name: 'Business-University Section',
        startStation: 'Business Park',
        endStation: 'University',
        length: 12.8,
        maxSpeed: 110
      }
    ]
  },
  {
    id: '3',
    name: 'West-Downtown Express',
    stations: ['Arts Quarter', 'Financial District', 'City Hall', 'West Terminal'],
    distance: 52.1,
    estimatedTime: 28,
    trafficLevel: 'low',
    energyConsumption: 189,
    maxTrainsPerHour: 15,
    currentThroughput: 5,
    sections: []
  }
];

export const mockSections: Section[] = [
  {
    id: 'SEC-001',
    name: 'Central-Tech High Density Section',
    startStation: 'Central Station',
    endStation: 'Tech District',
    length: 15.2,
    maxSpeed: 130,
    signallingSystem: 'automatic',
    trackType: 'double',
    currentOccupancy: 2,
    maxCapacity: 4,
    safetyMargin: 2.5,
    conflictPoints: ['Junction-A', 'Level-Crossing-1']
  }
];

export const mockTrafficControllers: TrafficController[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    section: 'Central Division',
    experience: 15,
    currentLoad: 8,
    decisions: [
      {
        id: 'D001',
        timestamp: '14:15',
        trainId: '1',
        decision: 'proceed',
        reasoning: 'Clear section ahead, priority train',
        aiRecommendation: 'proceed',
        followedAI: true
      }
    ]
  }
];

export const mockSchedules: Schedule[] = [
  {
    id: '1',
    trainId: '1',
    routeId: '1',
    departureTime: '14:00',
    arrivalTime: '14:35',
    status: 'active',
    passengers: 245
  },
  {
    id: '2',
    trainId: '2',
    routeId: '2',
    departureTime: '14:15',
    arrivalTime: '14:57',
    status: 'active',
    passengers: 189
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'delay',
    severity: 'medium',
    message: 'Metro Beta experiencing 7-minute delay due to signal interference',
    timestamp: '14:15',
    resolved: false
  },
  {
    id: '2',
    type: 'maintenance',
    severity: 'high',
    message: 'Local Delta scheduled for brake system maintenance',
    timestamp: '13:45',
    resolved: false
  },
  {
    id: '3',
    type: 'energy',
    severity: 'low',
    message: 'Energy optimization completed on West-Downtown Express route',
    timestamp: '13:30',
    resolved: true
  }
];

export const mockAnalytics: Analytics = {
  totalTrains: 12,
  onTimePerformance: 91.2,
  averageDelay: 3.2,
  energyEfficiency: 91.8,
  passengerSatisfaction: 4.3,
  maintenanceAlerts: 3
};