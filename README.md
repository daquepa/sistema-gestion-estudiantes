# 🎓 Sistema de Gestión Estudiantil (Fullstack)

Este es un sistema de administración escolar moderno diseñado para gestionar registros de estudiantes con operaciones CRUD completas. Utiliza una arquitectura desacoplada con un backend en Python y un frontend reactivo en React.



## 🛠️ Tecnologías Utilizadas

### Backend
* **Python 3.10+** & **Django**: Framework base.
* **Strawberry GraphQL**: API de datos moderna y tipada.
* **PostgreSQL/SQLite**: Persistencia de datos.

### Frontend
* **React 18** & **TypeScript**: Interfaz de usuario segura.
* **Apollo Client**: Gestión de consultas GraphQL.
* **Tailwind CSS**: Diseño profesional y responsivo.

---

## 🚀 Instrucciones de Instalación

### 1. Configuración del Backend
1. Entra a la carpeta del servidor:
   ```bash
   cd backend_estudiantes

2. Crea y activa el entorno virtual:
   python -m venv venv
# En Windows: venv\Scripts\activate

3. Instala dependencias y corre migraciones:

pip install django django-cors-headers strawberry-graphql[django]
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

2. Configuración del Frontend
    1. Entra a la carpeta del cliente:

    cd frontend-estudiantes

    2. Instala e inicia:

    npm install
    npm run dev

    3. Campos del Estudiante
DNI: Identificador único.

Nombres y Apellidos: Datos personales.

Teléfono: Contacto (Nuevo campo).

Nivel y Curso: Ubicación académica.

Fecha de Inscripción: Registro automático (Nuevo campo).

Estado: Activo / Inactivo.

Notas de Entrega
El sistema utiliza CamelCase para la comunicación GraphQL (fechaInscripcion).

Se incluye validación de búsqueda en tiempo real en el frontend.

Campo,Tipo,Descripción
dni,String,Identificador único (Primary Key lógica).
nombres,String,Nombre(s) del alumno.
apellidos,String,Apellido(s) del alumno.
telefono,String,Contacto de emergencia (Opcional).
nivel,String,Primaria / Secundaria.
curso,String,Grado específico (ej: 6to A).
estado,Boolean,Indica si el alumno está Activo o Inactivo.
fecha_inscripcion,Date,Registro automático de la fecha de ingreso.

Funcionalidades Clave
Busqueda Inteligente: Filtrado en tiempo real por DNI, Nombres o Apellidos.

Validación de Datos: Campos obligatorios y control de tipos con TypeScript.

Interfaz Adaptable: Diseño optimizado para Tablets y computadoras de escritorio.

Estado Visual: Etiquetas de colores (Badges) para identificar rápidamente alumnos inactivos.

API Explorer: Acceso a la documentación interactiva en http://localhost:8000/graphql/.

Notas de Desarrollo
El backend utiliza CORS headers para permitir la comunicación con el puerto de Vite (usualmente 5173).

La comunicación entre capas se realiza exclusivamente mediante GraphQL Queries y Mutations.