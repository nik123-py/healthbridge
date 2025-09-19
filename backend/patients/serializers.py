from rest_framework import serializers
from .models import Patient, VitalsRecord

class PatientSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = Patient
        fields = [
            'id', 'first_name', 'last_name', 'full_name', 'date_of_birth', 
            'gender', 'phone_number', 'email', 'village', 'block', 'district', 
            'state', 'pincode', 'emergency_contact_name', 'emergency_contact_phone',
            'blood_group', 'allergies', 'medical_history', 'created_by', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']

class VitalsRecordSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    bmi = serializers.ReadOnlyField()
    
    class Meta:
        model = VitalsRecord
        fields = [
            'id', 'patient', 'patient_name', 'recorded_by', 'systolic_bp', 
            'diastolic_bp', 'heart_rate', 'temperature', 'weight', 'height',
            'bmi', 'symptoms', 'notes', 'recorded_at'
        ]
        read_only_fields = ['id', 'recorded_by', 'recorded_at']
