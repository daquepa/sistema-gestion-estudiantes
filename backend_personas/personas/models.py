# personas/models.py
from django.db import models

class Persona(models.Model):
    dni = models.CharField(max_length=20, unique=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200) # Asegúrate que existan
    telefono = models.CharField(max_length=20)   # Asegúrate que existan
    email = models.EmailField(unique=True)       # Cambiado de 'mail' a 'email'
