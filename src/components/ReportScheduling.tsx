import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Download, 
  Mail, 
  Settings,
  Users,
  Train,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  Eye,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { mockTrains, mockAnalytics } from '../data/mockData';

interface ReportConfig {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  frequency: string;
  recipients: string[];
  sections: string[];
  lastGenerated: string;
  nextScheduled: string;
  status: 'active' | 'paused' | 'error';
  format: 'pdf' | 'excel' | 'csv';
}

interface GeneratedReport {
  id: string;
  name: string;
  type: string;
  generatedAt: string;
  size: string;
  status: 'completed' | 'generating' | 'failed';
  downloadUrl?: string;
}

const ReportScheduling: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'reports' | 'analytics'>('schedule');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<string>('');

  const [reportConfigs] = useState<ReportConfig[]>([
    {
      id: 'daily-ops',
      name: 'Daily Operations Report',
      type: 'daily',
      frequency: 'Every day at 6:00 AM',
      recipients: ['ops@indianrailways.gov.in', 'control@indianrailways.gov.in'],
      sections: ['Train Status', 'Passenger Details', 'Performance Metrics', 'Delays'],
      lastGenerated: '2024-01-15 06:00',
      nextScheduled: '2024-01-16 06:00',
      status: 'active',
      format: 'pdf'
    },
    {
      id: 'weekly-analysis',
      name: 'Weekly Performance Analysis',
      type: 'weekly',
      frequency: 'Every Monday at 8:00 AM',
      recipients: ['management@indianrailways.gov.in', 'analytics@indianrailways.gov.in'],
      sections: ['Throughput Analysis', 'Energy Efficiency', 'Route Optimization', 'Financial Impact'],
      lastGenerated: '2024-01-08 08:00',
      nextScheduled: '2024-01-15 08:00',
      status: 'active',
      format: 'excel'
    },
    {
      id: 'monthly-summary',
      name: 'Monthly Executive Summary',
      type: 'monthly',
      frequency: '1st of every month at 9:00 AM',
      recipients: ['director@indianrailways.gov.in', 'board@indianrailways.gov.in'],
      sections: ['Executive Summary', 'KPI Dashboard', 'Strategic Insights', 'Recommendations'],
      lastGenerated: '2024-01-01 09:00',
      nextScheduled: '2024-02-01 09:00',
      status: 'active',
      format: 'pdf'
    },
    {
      id: 'passenger-feedback',
      name: 'Passenger Satisfaction Report',
      type: 'weekly',
      frequency: 'Every Friday at 5:00 PM',
      recipients: ['customer@indianrailways.gov.in', 'quality@indianrailways.gov.in'],
      sections: ['Passenger Feedback', 'Service Quality', 'Complaint Analysis', 'Improvement Areas'],
      lastGenerated: '2024-01-12 17:00',
      nextScheduled: '2024-01-19 17:00',
      status: 'paused',
      format: 'excel'
    }
  ]);

  const [generatedReports] = useState<GeneratedReport[]>([
    {
      id: 'rep-001',
      name: 'Daily Operations Report - Jan 15, 2024',
      type: 'Daily Operations',
      generatedAt: '2024-01-15 06:00',
      size: '2.4 MB',
      status: 'completed'
    },
    {
      id: 'rep-002',
      name: 'Weekly Performance Analysis - Week 2, 2024',
      type: 'Weekly Analysis',
      generatedAt: '2024-01-14 08:00',
      size: '5.7 MB',
      status: 'completed'
    },
    {
      id: 'rep-003',
      name: 'Passenger Satisfaction Report - Jan 12, 2024',
      type: 'Passenger Feedback',
      generatedAt: '2024-01-12 17:00',
      size: '1.8 MB',
      status: 'completed'
    },
    {
      id: 'rep-004',
      name: 'Emergency Traffic Analysis - Jan 14, 2024',
      type: 'Custom Report',
      generatedAt: '2024-01-14 14:30',
      size: '3.2 MB',
      status: 'generating'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'paused':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'generating':
        return 'text-blue-600 bg-blue-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const generateInstantReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const currentPassengerLoad = mockTrains.reduce((total, train) => total + train.passengers, 0);
  const totalCapacity = mockTrains.reduce((total, train) => total + train.capacity, 0);
  const averageOccupancy = ((currentPassengerLoad / totalCapacity) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automated Report Scheduling</h1>
          <p className="text-gray-600">Comprehensive passenger details, train status, and operational analytics</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={generateInstantReport}
            disabled={isGenerating}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span>Generate Now</span>
              </>
            )}
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+5.2%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{currentPassengerLoad.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm">Current Passengers</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Train className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">{mockTrains.length} active</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{averageOccupancy}%</h3>
            <p className="text-gray-600 text-sm">Average Occupancy</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">4 scheduled</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">247</h3>
            <p className="text-gray-600 text-sm">Reports Generated</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12.8%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{mockAnalytics.onTimePerformance}%</h3>
            <p className="text-gray-600 text-sm">On-Time Performance</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'schedule', label: 'Scheduled Reports', icon: Calendar },
              { id: 'reports', label: 'Generated Reports', icon: FileText },
              { id: 'analytics', label: 'Report Analytics', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Scheduled Reports</h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Calendar className="w-4 h-4 mr-2" />
                  New Schedule
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reportConfigs.map((config) => (
                  <div key={config.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{config.name}</h3>
                          <p className="text-sm text-gray-600">{config.frequency}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(config.status)}`}>
                        {config.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {config.status === 'paused' && <Pause className="w-3 h-3 mr-1" />}
                        {config.status === 'error' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {config.status.charAt(0).toUpperCase() + config.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Report Sections</p>
                        <div className="flex flex-wrap gap-1">
                          {config.sections.map((section, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                              {section}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Last Generated</p>
                          <p className="font-medium text-gray-900">{config.lastGenerated}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Next Scheduled</p>
                          <p className="font-medium text-gray-900">{config.nextScheduled}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Recipients ({config.recipients.length})</p>
                        <div className="text-xs text-gray-600">
                          {config.recipients.slice(0, 2).join(', ')}
                          {config.recipients.length > 2 && ` +${config.recipients.length - 2} more`}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600">Format:</span>
                        <span className="text-xs font-medium text-gray-900 uppercase">{config.format}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800 text-sm">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Generated Reports</h2>
                <div className="flex space-x-2">
                  <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Bulk Download
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {generatedReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{report.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.generatedAt}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {report.status === 'generating' && <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-1"></div>}
                        {report.status === 'failed' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800 p-1">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 p-1">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Report Analytics & Insights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <PieChart className="w-8 h-8 text-blue-600" />
                    <span className="text-sm text-blue-700 font-medium">+15.3%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900">247</h3>
                  <p className="text-blue-700 text-sm">Total Reports Generated</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="w-8 h-8 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">98.7%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-900">4.2s</h3>
                  <p className="text-green-700 text-sm">Avg Generation Time</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Mail className="w-8 h-8 text-purple-600" />
                    <span className="text-sm text-purple-700 font-medium">100%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900">1,247</h3>
                  <p className="text-purple-700 text-sm">Reports Delivered</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current System Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Passenger Analytics</h4>
                    <div className="space-y-3">
                      {mockTrains.map((train) => (
                        <div key={train.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{train.name}</p>
                            <p className="text-sm text-gray-600">{train.trainNumber}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{train.passengers}/{train.capacity}</p>
                            <p className="text-sm text-gray-600">{Math.round((train.passengers/train.capacity)*100)}% occupied</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Operational Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">On-Time Performance</span>
                        <span className="font-medium text-green-600">{mockAnalytics.onTimePerformance}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Average Delay</span>
                        <span className="font-medium text-orange-600">{mockAnalytics.averageDelay} min</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Energy Efficiency</span>
                        <span className="font-medium text-blue-600">{mockAnalytics.energyEfficiency}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Passenger Satisfaction</span>
                        <span className="font-medium text-purple-600">{mockAnalytics.passengerSatisfaction}/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportScheduling;