# Gestin de Usuarios

Sistema de gestión de usuarios desarrollado con .NET 9 y Angular 19.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) (versión 24)
- [Angular CLI](https://angular.io/cli) versión 19.2.19
- [Visual Studio 2022](https://visualstudio.microsoft.com/)
- SQL Server

### Verificar instalaciones

```bash
# Verificar .NET
dotnet --version

# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Angular CLI
ng version

```

## 🚀 Configuración del Proyecto

### 1. Clonar el Repositorio

```bash
git clone https://github.com/dev-sandoval/Prueba-Tecnica-Atena.git
cd Prueba-Tecnica-Atena
```

### 2. Crear Base de datos SQL Server

```bash
docker-compose up -d
```

### 3. Configurar el Backend (.NET)

#### 3.1. Restaurar paquetes NuGet

```bash
dotnet restore
```

#### 3.2. Configurar la Base de Datos

Si el proyecto utiliza Entity Framework Core:

```bash
# Actualizar la cadena de conexión en appsettings.json
# Navegar al proyecto de API/Web
cd UserManagement.API

# Aplicar migraciones
dotnet ef database update
```

#### 3.3. Configurar appsettings.json

Edita el archivo `appsettings.json` o `appsettings.Development.json` con tus configuraciones locales:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=UserManagementDB;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:4200"]
  }
}
```

#### 3.4. Configurar variables de entorno (opcional)

```bash
dotnet user-secrets init

dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost;Database=UserManagementDB;User Id=sa;Password=developerdaviddatabase1234!;TrustServerCertificate=True;"

dotnet user-secrets list
```

### 4. Configurar el Frontend (Angular)

#### 4.1. Instalar dependencias

```bash
cd UserManagement.Client
npm install
```

#### 4.2. Configurar variables de entorno

Edita el archivo `src/environments/environment.ts`:

```bash
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5192/api'
};
```

## ▶️ Ejecutar el Proyecto

### Opción 1: Ejecutar desde Visual Studio (Recomendado)

1. Abre la solución `UserManagement.sln` en Visual Studio 2022
2. Configura múltiples proyectos de inicio:
   - Click derecho en la solución → **Propiedades**
   - Selecciona **Proyectos de inicio múltiples**
   - Establece la acción **Iniciar** para:
     - `UserManagement.API`
     - `UserManagement.Client`
3. Presiona **F5** o haz clic en **Iniciar**

### Opción 2: Ejecutar Manualmente

#### Terminal 1 - Backend

```bash
# Desde la raíz del proyecto
cd UserManagement.API
dotnet run
```

El backend estará disponible en:

- HTTPS: `https://localhost:5192`
- HTTP: `http://localhost:5000`
- Swagger UI: `https://localhost:5192/swagger`

#### Terminal 2 - Frontend

```bash
# Desde la raíz del proyecto
cd UserManagement.Client
npm start
# o
ng serve
```

El frontend estará disponible en: `http://localhost:4200`

## 📁 Estructura del Proyecto

```bash
UserManagement/
├── UserManagement.Domain/         # Entidades y lógica de dominio
│   └── Entities/
│       └── User.cs
├── UserManagement.Application/    # Casos de uso y DTOs
├── UserManagement.Infrastructure/ # Persistencia y servicios externos
├── UserManagement.API/           # API REST
└── UserManagement.Client/        # Aplicación Angular
    ├── src/
    │   ├── app/
    │   ├── environments/
    │   └── main.ts
    └── README.md
```

## 🔧 Solución de Problemas

### Error de certificado SSL

```bash
# Confiar en el certificado de desarrollo de .NET
dotnet dev-certs https --trust
```
