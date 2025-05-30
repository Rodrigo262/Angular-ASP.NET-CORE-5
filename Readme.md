# Curso de Udemy de Angular y ASP.NET Core

https://www.https://www.udemy.com/course/desarrollando-aplicaciones-en-angular-y-aspnet-core/

# Secciones del curso

- Sección 1: Introducción Angular y ASP.NET Core
- Sección 2: Componentes en Angular
- Sección 3: Ruteo
- Sección 4: Formularios
- Sección 5: Introducción a ASP.NET Core
- Sección 6: Servicios y Entity Framework
- Sección 7: Seguridad
- Sección 8: Despliegues

# Herramientas Utilizadas

https://material.angular.io/

# Gestor de BBDD

- Se ha utilizado VS Code.
- Se ha instalado la extensión SQL Database Project y SQL Server (mssql).
- Se ha creado un proyecto Azure SQL Database - PeliculasAPI.
- Se selecciona la ubicación (en el Backend).
- Una vez generada, se publica.
- Seleccionamos new Azure SQL Database Emulator, puerto 1433 (default), contraseña, repite contraseña, acepta los terminos, seleccionamos latest y sin usar profile, se selecciona el projecto PeliculasAPI.
- Se publica como un docker (imprescindible tener Docker instalado).
- Se puede ejecutar `dotnet ef migrations add InitialCreate` y `dotnet ef database update`.

Después de eso se ya se puede realizar la conexión por parte del Backend a la BD con otra extensión SQL Server (mssql).

la cadena de conexión es algo como

```bash
Data Source=localhost,1433;Initial Catalog=PeliculasAPI;User ID=sa;Password=MyStrongPass123;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Authentication=SqlPassword;Application Name="SQL Database Project";Connect Retry Count=1;Connect Retry Interval=10;Command Timeout=30
```

github.com/gavilanch/Angular-y-ASP.NET-Core
