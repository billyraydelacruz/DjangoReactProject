from rest_framework import viewsets
from .serializers import AppointmentSerializer
from core.models import Appointment

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()
