from django.db import models

class Estudiante(models.Model):
    dni = models.CharField(max_length=20, unique=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    nivel = models.CharField(max_length=50)
    curso = models.CharField(max_length=50)
    estado = models.BooleanField(default=True)
    # NUEVOS CAMPOS
    fecha_inscripcion = models.DateField(auto_now_add=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"