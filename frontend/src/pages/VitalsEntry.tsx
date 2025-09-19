import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
}

const VitalsEntry: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState({
    patient: '',
    systolic_bp: '',
    diastolic_bp: '',
    heart_rate: '',
    temperature: '',
    weight: '',
    height: '',
    symptoms: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients/patients/');
      setPatients(response.data);
    } catch (err) {
      console.error('Error fetching patients:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const vitalsData = {
        ...formData,
        patient: parseInt(formData.patient),
        systolic_bp: parseInt(formData.systolic_bp),
        diastolic_bp: parseInt(formData.diastolic_bp),
        heart_rate: parseInt(formData.heart_rate),
        temperature: parseFloat(formData.temperature),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
      };

      await api.post('/patients/vitals/', vitalsData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to record vitals');
    } finally {
      setLoading(false);
    }
  };

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    if (weight && height && height > 0) {
      const heightM = height / 100;
      return (weight / (heightM * heightM)).toFixed(1);
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vitals Entry</h1>
          <p className="mt-2 text-gray-600">Record patient vital signs</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vital Signs</CardTitle>
            <CardDescription>Enter the patient's vital measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Selection */}
              <div>
                <label htmlFor="patient" className="block text-sm font-medium text-gray-700">
                  Select Patient *
                </label>
                <select
                  id="patient"
                  name="patient"
                  required
                  value={formData.patient}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.full_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Blood Pressure */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Blood Pressure</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="systolic_bp" className="block text-sm font-medium text-gray-700">
                      Systolic BP (mmHg) *
                    </label>
                    <Input
                      id="systolic_bp"
                      name="systolic_bp"
                      type="number"
                      required
                      min="50"
                      max="300"
                      value={formData.systolic_bp}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="diastolic_bp" className="block text-sm font-medium text-gray-700">
                      Diastolic BP (mmHg) *
                    </label>
                    <Input
                      id="diastolic_bp"
                      name="diastolic_bp"
                      type="number"
                      required
                      min="30"
                      max="200"
                      value={formData.diastolic_bp}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Heart Rate and Temperature */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Heart Rate & Temperature</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="heart_rate" className="block text-sm font-medium text-gray-700">
                      Heart Rate (bpm) *
                    </label>
                    <Input
                      id="heart_rate"
                      name="heart_rate"
                      type="number"
                      required
                      min="30"
                      max="300"
                      value={formData.heart_rate}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
                      Temperature (°C) *
                    </label>
                    <Input
                      id="temperature"
                      name="temperature"
                      type="number"
                      required
                      min="30"
                      max="45"
                      step="0.1"
                      value={formData.temperature}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Weight and Height */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Weight & Height</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                      Weight (kg) *
                    </label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      required
                      min="10"
                      max="500"
                      step="0.1"
                      value={formData.weight}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                      Height (cm) *
                    </label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      required
                      min="50"
                      max="300"
                      step="0.1"
                      value={formData.height}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>
                {calculateBMI() && (
                  <div className="text-sm text-gray-600">
                    <strong>BMI:</strong> {calculateBMI()}
                  </div>
                )}
              </div>

              {/* Symptoms and Notes */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
                <div>
                  <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
                    Symptoms
                  </label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    rows={3}
                    value={formData.symptoms}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Describe any symptoms the patient is experiencing"
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Additional notes or observations"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Recording...' : 'Record Vitals'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VitalsEntry;
