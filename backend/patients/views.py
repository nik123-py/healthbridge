from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Patient, VitalsRecord
from .serializers import PatientSerializer, VitalsRecordSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Co workers can see patients they created
        # Doctors can see all patients
        # Admins can see all patients
        if self.request.user.role == 'COWORKER':
            return Patient.objects.filter(created_by=self.request.user)
        return Patient.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['get'])
    def vitals(self, request, pk=None):
        patient = self.get_object()
        vitals = VitalsRecord.objects.filter(patient=patient).order_by('-recorded_at')
        serializer = VitalsRecordSerializer(vitals, many=True)
        return Response(serializer.data)

class VitalsRecordViewSet(viewsets.ModelViewSet):
    queryset = VitalsRecord.objects.all()
    serializer_class = VitalsRecordSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Co workers can see vitals they recorded
        # Doctors can see all vitals
        # Admins can see all vitals
        if self.request.user.role == 'COWORKER':
            return VitalsRecord.objects.filter(recorded_by=self.request.user)
        return VitalsRecord.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(recorded_by=self.request.user)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        # Get recent vitals records (last 10)
        vitals = self.get_queryset()[:10]
        serializer = self.get_serializer(vitals, many=True)
        return Response(serializer.data)
