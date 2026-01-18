import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stethoscope, Calendar, User, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

interface Consultation {
  id: number;
  patient_name: string;
  title: string;
  description: string;
  symptoms: string;
  diagnosis: string;
  treatment_plan: string;
  prescription: string;
  status: string;
  priority: string;
  scheduled_at: string;
  started_at: string | null;
  completed_at: string | null;
  co_worker_name: string;
  doctor_name: string | null;
}

const Consultations: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await api.get('/consultations/consultations/');
      setConsultations(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch consultations');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-100 text-red-800';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading consultations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Consultations</h1>
              <p className="text-gray-600">Manage patient consultations</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {consultations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Stethoscope className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No consultations</h3>
              <p className="mt-1 text-sm text-gray-500">
                There are no consultations in the system yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {consultations.map((consultation) => (
              <Card key={consultation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{consultation.title}</CardTitle>
                      <CardDescription className="mt-1">
                        Patient: {consultation.patient_name}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                        {consultation.status.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(consultation.priority)}`}>
                        {consultation.priority}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-sm text-gray-600">{consultation.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Symptoms</h4>
                      <p className="text-sm text-gray-600">{consultation.symptoms}</p>
                    </div>

                    {consultation.diagnosis && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Diagnosis</h4>
                        <p className="text-sm text-gray-600">{consultation.diagnosis}</p>
                      </div>
                    )}

                    {consultation.treatment_plan && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Treatment Plan</h4>
                        <p className="text-sm text-gray-600">{consultation.treatment_plan}</p>
                      </div>
                    )}

                    {consultation.prescription && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Prescription</h4>
                        <p className="text-sm text-gray-600">{consultation.prescription}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Scheduled</p>
                          <p className="text-sm font-medium">{formatDate(consultation.scheduled_at)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Co-worker</p>
                          <p className="text-sm font-medium">{consultation.co_worker_name}</p>
                        </div>
                      </div>

                      {consultation.doctor_name && (
                        <div className="flex items-center space-x-2">
                          <Stethoscope className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Doctor</p>
                            <p className="text-sm font-medium">{consultation.doctor_name}</p>
                          </div>
                        </div>
                      )}

                      {consultation.started_at && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Started</p>
                            <p className="text-sm font-medium">{formatDate(consultation.started_at)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Consultations;
