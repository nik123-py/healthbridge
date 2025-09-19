from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, VitalsRecordViewSet

router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'vitals', VitalsRecordViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
