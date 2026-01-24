import strawberry
from strawberry import django
from typing import List, Optional
from .models import Persona


@django.type(Persona)
class PersonaType:
    id: strawberry.ID
    dni: str
    nombres: str
    apellidos: str
    direccion: str
    telefono: str
    email: str


@strawberry.type
class Query:
    @strawberry.field
    def personas(self) -> List[PersonaType]:
        return Persona.objects.all()


@strawberry.type
class Mutation:

    @strawberry.mutation
    def crear_persona(
        self,
        dni: str,
        nombres: str,
        apellidos: str,
        direccion: str,
        telefono: str,
        email: str,
    ) -> PersonaType:
        persona = Persona.objects.create(
            dni=dni,
            nombres=nombres,
            apellidos=apellidos,
            direccion=direccion,
            telefono=telefono,
            email=email
        )
        return persona

    @strawberry.mutation
    def actualizar_persona(
        self,
        id: strawberry.ID,
        dni: Optional[str] = None,
        nombres: Optional[str] = None,
        apellidos: Optional[str] = None,
        direccion: Optional[str] = None,
        telefono: Optional[str] = None,
        email: Optional[str] = None,
    ) -> PersonaType:

        persona = Persona.objects.get(pk=id)

        if dni is not None:
            persona.dni = dni
        if nombres is not None:
            persona.nombres = nombres
        if apellidos is not None:
            persona.apellidos = apellidos
        if direccion is not None:
            persona.direccion = direccion
        if telefono is not None:
            persona.telefono = telefono
        if email is not None:
            persona.email = email

        persona.save()
        return persona

    @strawberry.mutation
    def eliminar_persona(self, id: strawberry.ID) -> bool:
        persona = Persona.objects.get(pk=id)
        persona.delete()
        return True


schema = strawberry.Schema(query=Query, mutation=Mutation)
