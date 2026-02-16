import strawberry
from strawberry import django
from typing import List, Optional
from estudiantes.models import Estudiante

@django.type(Estudiante)
class EstudianteType:
    id: strawberry.ID
    dni: str
    nombres: str
    apellidos: str
    nivel: str
    curso: str
    estado: bool
    telefono: Optional[str] # Nuevo campo
    fecha_inscripcion: str  # Nuevo campo (se devuelve como string)

@strawberry.type
class Query:
    @strawberry.field
    def estudiantes(self) -> List[EstudianteType]:
        return Estudiante.objects.all()

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
        telefono: Optional[str] = None,
        estado: bool = True
    ) -> EstudianteType:
        return Estudiante.objects.create(
            dni=dni, nombres=nombres, apellidos=apellidos,
            nivel=nivel, curso=curso, estado=estado, telefono=telefono
        )

    @strawberry.mutation
    def actualizar_estudiante(
        self,
        dni: str,
        nombres: Optional[str] = None,
        apellidos: Optional[str] = None,
        nivel: Optional[str] = None,
        curso: Optional[str] = None,
        telefono: Optional[str] = None,
        estado: Optional[bool] = None
    ) -> Optional[EstudianteType]:
        try:
            est = Estudiante.objects.get(dni=dni)
            if nombres is not None: est.nombres = nombres
            if apellidos is not None: est.apellidos = apellidos
            if nivel is not None: est.nivel = nivel
            if curso is not None: est.curso = curso
            if telefono is not None: est.telefono = telefono
            if estado is not None: est.estado = estado
            est.save()
            return est
        except Estudiante.DoesNotExist:
            return None

    @strawberry.mutation
    def eliminar_estudiante(self, dni: str) -> bool:
        try:
            Estudiante.objects.get(dni=dni).delete()
            return True
        except Estudiante.DoesNotExist:
            return False

schema = strawberry.Schema(query=Query, mutation=Mutation)