from django.urls import path
from django.views.decorators.csrf import csrf_exempt # Importa esto
from strawberry.django.views import GraphQLView
from .schema import schema

urlpatterns = [
    # ... otras rutas ...
    # Envuelve la vista con csrf_exempt
    path("graphql/", csrf_exempt(GraphQLView.as_view(schema=schema))),
]