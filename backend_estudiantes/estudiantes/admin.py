from django.contrib import admin
from .models import Estudiante

@admin.register(Estudiante)
class EstudianteAdmin(admin.ModelAdmin):
    # Agregamos los nuevos campos aquí también para verlos en el panel de Django
    list_display = ('dni', 'nombres', 'apellidos', 'nivel', 'curso', 'estado', 'telefono', 'fecha_inscripcion')
    search_fields = ('dni', 'nombres', 'apellidos')