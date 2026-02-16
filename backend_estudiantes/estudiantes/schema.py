import strawberry
from strawberry import django
from typing import List, Optional
from .models import Estudiante

@django.type(Estudiante)
class EstudianteType:
    id: strawberry.ID
    dni: str
    nombres: str
    apellidos: str
    nivel: str
    curso: str
    estado: bool

@strawberry.type
class Query:

    @strawberry.field
    def estudiantes(self) -> List[EstudianteType]:
        return Estudiante.objects.all()

    @strawberry.field
    def estudiante_por_dni(self, dni: str) -> Optional[EstudianteType]:
        try:
            return Estudiante.objects.get(dni=dni)
        except Estudiante.DoesNotExist:
            return None
@strawberry.type
class Mutation:

    @strawberry.mutation
    def crear_estudiante(
        self,
        dni: str,
        nombres: str,
        apellidos: str,
        nivel: str,
        curso: str,
        estado: bool = True
    ) -> EstudianteType:

        estudiante = Estudiante.objects.create(
            dni=dni,
            nombres=nombres,
            apellidos=apellidos,
            nivel=nivel,
            curso=curso,
            estado=estado
        )
        return estudiante
    @strawberry.mutation
    def actualizar_estudiante(
        self,
        dni: str,
        nombres: Optional[str] = None,
        apellidos: Optional[str] = None,
        nivel: Optional[str] = None,
        curso: Optional[str] = None,
        estado: Optional[bool] = None
    ) -> Optional[EstudianteType]:

        try:
            estudiante = Estudiante.objects.get(dni=dni)

            if nombres is not None:
                estudiante.nombres = nombres
            if apellidos is not None:
                estudiante.apellidos = apellidos
            if nivel is not None:
                estudiante.nivel = nivel
            if curso is not None:
                estudiante.curso = curso
            if estado is not None:
                estudiante.estado = estado

            estudiante.save()
            return estudiante
        except Estudiante.DoesNotExist:
            return None
    @strawberry.mutation
    def eliminar_estudiante(self, dni: str) -> bool:
        try:
            estudiante = Estudiante.objects.get(dni=dni)
            estudiante.delete()
            return True
        except Estudiante.DoesNotExist:
            return False
schema = strawberry.Schema(query=Query, mutation=Mutation)