from django.db import models

class Appointment(models.Model):
    name = models.CharField(max_length=100)
    start = models.DateTimeField(verbose_name='Start Time', unique=True)
    end = models.DateTimeField(verbose_name='End Time', unique=True)
    comments = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name