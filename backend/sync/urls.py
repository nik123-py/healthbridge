from django.urls import path
from . import views

urlpatterns = [
    path('data/', views.sync_data, name='sync_data'),
    path('upload/', views.upload_data, name='upload_data'),
]
