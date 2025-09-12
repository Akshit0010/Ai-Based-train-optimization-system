export interface Train {
  id: string;
  name: string;
  trainNumber: string;
  trainType: 'express' | 'passenger' | 'freight' | 'superfast' | 'local';
  priority: number; // 1-10, 10 being highest priority
  route: string;
  status: 'running' | 'delayed' | 'maintenance' | 'stopped';
  currentStation: string;
  nextStation: string;
  currentSection: string;
  nextSection: string;
  speed: number;
  maxSpeed: number;
  capacity: number;
  passengers: number;
  energyEfficiency: number;
  estimatedArrival: string;
  delay: number;
  position: { lat: number; lng: number };
  platformAssigned?: string;
  signalStatus: 'green' | 'yellow' | 'red';
  blockSection: string;
  headwayTime: number; // minutes
}

export interface Route {
  id: string;
  name: string;
  stations: string[];
  sections: Section[];
  distance: number;
  estimatedTime: number;
  trafficLevel: 'low' | 'medium' | 'high';
  energyConsumption: number;
  maxTrainsPerHour: number;
  currentThroughput: number;
}

export interface Section {
  id: string;
  name: string;
  startStation: string;
  endStation: string;
  length: number;
  maxSpeed: number;
  signallingSystem: 'manual' | 'automatic' | 'cab' | 'centralised';
  trackType: 'single' | 'double' | 'multiple';
  currentOccupancy: number;
  maxCapacity: number;
  safetyMargin: number;
  conflictPoints: string[];
}

export interface TrafficController {
  id: string;
  name: string;
  section: string;
  experience: number;
  currentLoad: number;
  decisions: ControllerDecision[];
}

export interface ControllerDecision {
  id: string;
  timestamp: string;
  trainId: string;
  decision: 'proceed' | 'hold' | 'divert' | 'priority_override';
  reasoning: string;
  aiRecommendation: string;
  followedAI: boolean;
}

export interface Schedule {
  id: string;
  trainId: string;
  routeId: string;
  departureTime: string;
  arrivalTime: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  passengers: number;
}

export interface Alert {
  id: string;
  type: 'maintenance' | 'delay' | 'traffic' | 'energy' | 'emergency';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface Analytics {
  totalTrains: number;
  onTimePerformance: number;
  averageDelay: number;
  energyEfficiency: number;
  passengerSatisfaction: number;
  maintenanceAlerts: number;
}