from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from strawberry.django.views import GraphQLView
from .schema import schema  # Importamos el esquema de Strawberry

urlpatterns = [
    path('admin/', admin.site.urls),
    # Usamos la vista de Strawberry
    path("graphql/", csrf_exempt(GraphQLView.as_view(schema=schema))),
]