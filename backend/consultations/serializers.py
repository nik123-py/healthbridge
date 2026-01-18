from rest_framework import serializers
from .models import Consultation
from patients.serializers import PatientSerializer

class ConsultationSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    co_worker_name = serializers.CharField(source='co_worker.get_full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.get_full_name', read_only=True)
    
    class Meta:
        model = Consultation
        fields = [
            'id', 'patient', 'patient_name', 'co_worker', 'co_worker_name',
            'doctor', 'doctor_name', 'title', 'description', 'symptoms',
            'diagnosis', 'treatment_plan', 'prescription', 'status', 'priority',
            'scheduled_at', 'started_at', 'completed_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'co_worker', 'created_at', 'updated_at']
