from rest_framework import viewsets, permissions
from .models import Consultation
from .serializers import ConsultationSerializer

class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'COWORKER':
            return Consultation.objects.filter(co_worker=self.request.user)
        elif self.request.user.role == 'DOCTOR':
            return Consultation.objects.filter(doctor=self.request.user)
        return Consultation.objects.all()