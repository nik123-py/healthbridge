from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Patient(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(blank=True, null=True)
    
    # Address fields
    village = models.CharField(max_length=100)
    block = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100, default='Bihar')
    pincode = models.CharField(max_length=10)
    
    # Emergency contact
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_phone = models.CharField(max_length=15)
    
    # Medical information
    blood_group = models.CharField(max_length=5, blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)
    medical_history = models.TextField(blank=True, null=True)
    
    # System fields
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_patients')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

class VitalsRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='vitals_records')
    recorded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recorded_vitals')
    
    # Vital signs
    systolic_bp = models.IntegerField(help_text="Systolic Blood Pressure (mmHg)")
    diastolic_bp = models.IntegerField(help_text="Diastolic Blood Pressure (mmHg)")
    heart_rate = models.IntegerField(help_text="Heart Rate (bpm)")
    temperature = models.DecimalField(max_digits=4, decimal_places=1, help_text="Temperature (°C)")
    weight = models.DecimalField(max_digits=5, decimal_places=2, help_text="Weight (kg)")
    height = models.DecimalField(max_digits=5, decimal_places=2, help_text="Height (cm)")
    
    # Additional information
    symptoms = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    
    # System fields
    recorded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Vitals for {self.patient.full_name} - {self.recorded_at.strftime('%Y-%m-%d %H:%M')}"
    
    @property
    def bmi(self):
        if self.height > 0:
            height_m = self.height / 100
            return round(self.weight / (height_m ** 2), 2)
        return None
