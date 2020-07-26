from rest_framework import serializers
from datetime import date, time
from django.conf import settings
from core.models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):

   
    def validate(self, data):

         # Check if the new appointment overlaps with the current appointments 

        existingData = Appointment.objects.filter(start__date=data['start'].date(), end__date=data['end'].date())
        for item in existingData:
            if (data['start'] or data['end']) > item.start and (data['start'] or data['end'])< item.end:
                raise serializers.ValidationError('Appointment is not available') 
        
        # Check if the new appointment falls on Sunday

        if (data['start'].weekday() or data['end'].weekday()) == 6:
            raise serializers.ValidationError('Appointment on Sunday is not allowed')

        return data
    
    def validate_start(self, data):
        if data.time() < settings.OPENING_TIME or data.time() >= settings.CLOSING_TIME:
            raise serializers.ValidationError('Invalid start time')
        return data

    def validate_end(self, data):
        if data.time() > settings.CLOSING_TIME or data.time() <= settings.OPENING_TIME:
            raise serializers.ValidationError('Invalid end time')
        return data

    class Meta:
        model = Appointment
        fields = ('id' ,'name', 'start', 'end', 'comments')
        extra_kwargs = {'comments': {'required': False}}


        