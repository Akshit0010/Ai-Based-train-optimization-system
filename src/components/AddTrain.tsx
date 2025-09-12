import React, { useState } from 'react';
import { 
  Train, 
  Plus, 
  Save, 
  X, 
  MapPin, 
  Clock, 
  Users, 
  Zap,
  AlertCircle,
  CheckCircle,
  Route,
  Signal
} from 'lucide-react';

interface NewTrainData {
  name: string;
  trainNumber: string;
  trainType: 'express' | 'passenger' | 'freight' | 'superfast' | 'local';
  priority: number;
  route: string;
  currentStation: string;
  nextStation: string;
  currentSection: string;
  nextSection: string;
  maxSpeed: number;
  capacity: number;
  passengers: number;
  departureTime: string;
  arrivalTime: string;
  platformAssigned: string;
  blockSection: string;
  signallingSystem: 'manual' | 'automatic' | 'cab' | 'centralised';
  trackType: 'single' | 'double' | 'multiple';
}

const AddTrain: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<NewTrainData>({
    name: '',
    trainNumber: '',
    trainType: 'passenger',
    priority: 5,
    route: '',
    currentStation: '',
    nextStation: '',
    currentSection: '',
    nextSection: '',
    maxSpeed: 80,
    capacity: 200,
    passengers: 0,
    departureTime: '',
    arrivalTime: '',
    platformAssigned: '',
    blockSection: '',
    signallingSystem: 'automatic',
    trackType: 'double'
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const trainTypes = [
    { value: 'superfast', label: 'Superfast Express', icon: '🚄', priority: 9 },
    { value: 'express', label: 'Express', icon: '🚅', priority: 7 },
    { value: 'passenger', label: 'Passenger', icon: '🚃', priority: 5 },
    { value: 'freight', label: 'Freight', icon: '🚂', priority: 3 },
    { value: 'local', label: 'Local', icon: '🚇', priority: 2 }
  ];

  const stations = [
    'Central Station', 'Tech District', 'Innovation Hub', 'North Terminal',
    'Business Park', 'University', 'Medical Center', 'East Station',
    'Arts Quarter', 'Financial District', 'City Hall', 'West Terminal',
    'Suburban West', 'Suburban East', 'Industrial Zone', 'Airport Junction'
  ];

  const sections = [
    'SEC-001', 'SEC-002', 'SEC-003', 'SEC-004', 'SEC-005', 'SEC-006',
    'SEC-007', 'SEC-008', 'SEC-009', 'SEC-010'
  ];

  const blockSections = [
    'BLK-A1', 'BLK-A2', 'BLK-B1', 'BLK-B2', 'BLK-C1', 'BLK-C2',
    'BLK-D1', 'BLK-D2', 'BLK-YARD'
  ];

  const handleInputChange = (field: keyof NewTrainData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-set priority based on train type
    if (field === 'trainType') {
      const selectedType = trainTypes.find(type => type.value === value);
      if (selectedType) {
        setFormData(prev => ({
          ...prev,
          priority: selectedType.priority
        }));
      }
    }

    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push('Train name is required');
    if (!formData.trainNumber.trim()) errors.push('Train number is required');
    if (!formData.route.trim()) errors.push('Route is required');
    if (!formData.currentStation) errors.push('Current station is required');
    if (!formData.nextStation) errors.push('Next station is required');
    if (!formData.currentSection) errors.push('Current section is required');
    if (!formData.nextSection) errors.push('Next section is required');
    if (!formData.departureTime) errors.push('Departure time is required');
    if (!formData.arrivalTime) errors.push('Arrival time is required');
    if (!formData.platformAssigned.trim()) errors.push('Platform assignment is required');
    if (!formData.blockSection) errors.push('Block section is required');
    if (formData.passengers > formData.capacity) errors.push('Passengers cannot exceed capacity');
    if (formData.maxSpeed < 20 || formData.maxSpeed > 200) errors.push('Max speed must be between 20-200 km/h');

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsFormOpen(false);
        setSubmitSuccess(false);
        setFormData({
          name: '',
          trainNumber: '',
          trainType: 'passenger',
          priority: 5,
          route: '',
          currentStation: '',
          nextStation: '',
          currentSection: '',
          nextSection: '',
          maxSpeed: 80,
          capacity: 200,
          passengers: 0,
          departureTime: '',
          arrivalTime: '',
          platformAssigned: '',
          blockSection: '',
          signallingSystem: 'automatic',
          trackType: 'double'
        });
      }, 2000);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      trainNumber: '',
      trainType: 'passenger',
      priority: 5,
      route: '',
      currentStation: '',
      nextStation: '',
      currentSection: '',
      nextSection: '',
      maxSpeed: 80,
      capacity: 200,
      passengers: 0,
      departureTime: '',
      arrivalTime: '',
      platformAssigned: '',
      blockSection: '',
      signallingSystem: 'automatic',
      trackType: 'double'
    });
    setValidationErrors([]);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Train Registration System</h1>
          <p className="text-gray-600">Add new trains to the AI optimization network</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Train</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Train className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+3 today</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">247</h3>
            <p className="text-gray-600 text-sm">Total Registered Trains</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">98.7%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">243</h3>
            <p className="text-gray-600 text-sm">Active Trains</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">2 pending</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">15</h3>
            <p className="text-gray-600 text-sm">Scheduled Today</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Route className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">12 routes</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">89.3%</h3>
            <p className="text-gray-600 text-sm">Route Utilization</p>
          </div>
        </div>
      </div>

      {/* Add Train Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Train className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Register New Train</h2>
                    <p className="text-gray-600">Add train to AI optimization network</p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Train Registered Successfully!</h3>
                <p className="text-gray-600 mb-4">
                  {formData.name} ({formData.trainNumber}) has been added to the system and is now being optimized by AI.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">
                    ✓ Route optimization calculated<br/>
                    ✓ Priority scheduling applied<br/>
                    ✓ Section throughput updated<br/>
                    ✓ Traffic control notified
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <h4 className="font-medium text-red-800">Please fix the following errors:</h4>
                    </div>
                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <Train className="w-5 h-5" />
                      <span>Basic Information</span>
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Train Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Rajdhani Express"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Train Number *</label>
                      <input
                        type="text"
                        value={formData.trainNumber}
                        onChange={(e) => handleInputChange('trainNumber', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 12001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Train Type *</label>
                      <select
                        value={formData.trainType}
                        onChange={(e) => handleInputChange('trainType', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {trainTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority (1-10) *</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={formData.priority}
                        onChange={(e) => handleInputChange('priority', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Higher numbers = higher priority</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <MapPin className="w-5 h-5" />
                      <span>Route Information</span>
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Route Name *</label>
                      <input
                        type="text"
                        value={formData.route}
                        onChange={(e) => handleInputChange('route', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Central-North Loop"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Station *</label>
                      <select
                        value={formData.currentStation}
                        onChange={(e) => handleInputChange('currentStation', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select current station</option>
                        {stations.map(station => (
                          <option key={station} value={station}>{station}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Next Station *</label>
                      <select
                        value={formData.nextStation}
                        onChange={(e) => handleInputChange('nextStation', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select next station</option>
                        {stations.map(station => (
                          <option key={station} value={station}>{station}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Platform Assignment *</label>
                      <input
                        type="text"
                        value={formData.platformAssigned}
                        onChange={(e) => handleInputChange('platformAssigned', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Platform 1"
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <Signal className="w-5 h-5" />
                      <span>Technical Specifications</span>
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Section *</label>
                      <select
                        value={formData.currentSection}
                        onChange={(e) => handleInputChange('currentSection', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select current section</option>
                        {sections.map(section => (
                          <option key={section} value={section}>{section}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Next Section *</label>
                      <select
                        value={formData.nextSection}
                        onChange={(e) => handleInputChange('nextSection', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select next section</option>
                        {sections.map(section => (
                          <option key={section} value={section}>{section}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Block Section *</label>
                      <select
                        value={formData.blockSection}
                        onChange={(e) => handleInputChange('blockSection', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select block section</option>
                        {blockSections.map(block => (
                          <option key={block} value={block}>{block}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Signalling System</label>
                      <select
                        value={formData.signallingSystem}
                        onChange={(e) => handleInputChange('signallingSystem', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="automatic">Automatic Block Signalling</option>
                        <option value="manual">Manual Block System</option>
                        <option value="cab">CAB Signalling</option>
                        <option value="centralised">Centralised Traffic Control</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Capacity & Schedule</span>
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Speed (km/h) *</label>
                      <input
                        type="number"
                        min="20"
                        max="200"
                        value={formData.maxSpeed}
                        onChange={(e) => handleInputChange('maxSpeed', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Capacity *</label>
                      <input
                        type="number"
                        min="50"
                        max="2000"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Passengers</label>
                      <input
                        type="number"
                        min="0"
                        max={formData.capacity}
                        value={formData.passengers}
                        onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time *</label>
                        <input
                          type="time"
                          value={formData.departureTime}
                          onChange={(e) => handleInputChange('departureTime', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Arrival Time *</label>
                        <input
                          type="time"
                          value={formData.arrivalTime}
                          onChange={(e) => handleInputChange('arrivalTime', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Track Type</label>
                      <select
                        value={formData.trackType}
                        onChange={(e) => handleInputChange('trackType', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="single">Single Line</option>
                        <option value="double">Double Line</option>
                        <option value="multiple">Multiple Line</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Registering...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Register Train</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Recent Registrations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Train Registrations</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: 'Shatabdi Express', number: '12005', type: 'express', time: '2 hours ago', status: 'active' },
              { name: 'Freight Local', number: '52003', type: 'freight', time: '4 hours ago', status: 'active' },
              { name: 'Passenger Express', number: '56007', type: 'passenger', time: '6 hours ago', status: 'scheduled' },
            ].map((train, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Train className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{train.name}</h3>
                    <p className="text-sm text-gray-600">{train.number} • {train.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    train.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {train.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{train.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTrain;