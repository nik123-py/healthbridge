from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from patients.models import Patient, VitalsRecord
from consultations.models import Consultation
from patients.serializers import PatientSerializer, VitalsRecordSerializer
from consultations.serializers import ConsultationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sync_data(request):
    """Sync data for offline-first functionality"""
    last_sync = request.GET.get('last_sync')
    
    if last_sync:
        try:
            last_sync_dt = timezone.datetime.fromisoformat(last_sync.replace('Z', '+00:00'))
        except:
            last_sync_dt = None
    else:
        last_sync_dt = None
    
    # Get data based on user role
    if request.user.role == 'COWORKER':
        patients = Patient.objects.filter(created_by=request.user)
        vitals = VitalsRecord.objects.filter(recorded_by=request.user)
        consultations = Consultation.objects.filter(co_worker=request.user)
    elif request.user.role == 'DOCTOR':
        patients = Patient.objects.all()
        vitals = VitalsRecord.objects.all()
        consultations = Consultation.objects.filter(doctor=request.user)
    else:  # ADMIN
        patients = Patient.objects.all()
        vitals = VitalsRecord.objects.all()
        consultations = Consultation.objects.all()
    
    # Filter by last sync time if provided
    if last_sync_dt:
        patients = patients.filter(updated_at__gt=last_sync_dt)
        vitals = vitals.filter(recorded_at__gt=last_sync_dt)
        consultations = consultations.filter(updated_at__gt=last_sync_dt)
    
    data = {
        'patients': PatientSerializer(patients, many=True).data,
        'vitals': VitalsRecordSerializer(vitals, many=True).data,
        'consultations': ConsultationSerializer(consultations, many=True).data,
        'sync_timestamp': timezone.now().isoformat(),
    }
    
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_data(request):
    """Upload offline data when connection is restored"""
    # This would handle bulk data upload from offline storage
    # For now, just return success
    return Response({'status': 'success', 'message': 'Data uploaded successfully'})
