import strawberry
# Importamos las clases Query y Mutation que ya definiste con Strawberry
from personas.schema import Query as PersonaQuery, Mutation as PersonaMutation

@strawberry.type
class Query(PersonaQuery):
    # Aquí puedes heredar de otros Querys si tuvieras más apps
    pass

@strawberry.type
class Mutation(PersonaMutation):
    # Aquí puedes heredar de otros Mutations
    pass

# El esquema final debe ser de Strawberry
schema = strawberry.Schema(query=Query, mutation=Mutation)