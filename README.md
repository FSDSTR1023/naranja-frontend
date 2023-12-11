# TODO-MESSENGER-GROUP-MANAGER (TASKTALK)

## Descripción General del Proyecto
Este proyecto es una aplicación de gestión de tareas y mensajería grupal. Permite a los usuarios registrarse, crear tareas, asignarse entre sí y unirse a grupos para comunicarse a través de mensajes grupales o individuales (ya sea texto, vídeo, archivo o imágenes). El proyecto está en desarrollo, con la funcionalidad del chat y la mayoría del frontend pendientes de implementación.

## Estado del Proyecto
En desarrollo.

## Funcionalidades Principales
- Registro de usuarios.
- Autenticación y verificación de usuarios.
- Creación, edición y eliminación de tareas.
- Gestión de grupos con operaciones como crear, editar, eliminar y agregar/eliminar miembros.
- Mensajería grupal y P2P (pendiente de implementación).

## Requisitos para la Integración
- Node.js y npm instalados.
- Base de datos MongoDB.
- Configuración de variables de entorno en un archivo `.env`.
  - `DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_NAME` para la conexión a MongoDB.
  - `TOKEN_SECRET` para la generación de tokens de acceso.
  - `PORT` para el puerto en el que se ejecutará el servidor.
  - Otras variables de entorno según sea necesario.

## Tecnologías Utilizadas
- [Express.js](https://expressjs.com/es/starter/installing.html) para el servidor web.
- [MongoDB](https://www.mongodb.com/es) y [Mongoose](https://mongoosejs.com/docs/) para la base de datos.
- [JSON Web Tokens (JWT)](https://jwt.io/introduction) para la autenticación.
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) para el hash de contraseñas.
- [Nodemon](https://nodemon.io) para la ejecución del servidor en modo de desarrollo.
- [Morgan](https://www.npmjs.com/package/morgan) para la generación de registros de actividad del servidor.
- [Cookie-parser](http://expressjs.com/en/resources/middleware/cookie-parser.html) para el manejo de cookies en Express.
- [Cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) para habilitar el intercambio de recursos entre diferentes dominios.
- [Dotenv](https://www.npmjs.com/package/dotenv) para la carga de variables de entorno desde un archivo.
- [Body-parser](https://www.npmjs.com/package/body-parser) para analizar datos JSON y URL en las solicitudes.
- [Socket.io](https://socket.io/docs/v4/) (pendiente de implementación) para la mensajería en tiempo real.
- [Nodemailer](https://nodemailer.com) para el envío de correos electrónicos de verificación.
- [Googleapis](https://googleapis.dev/nodejs/googleapis/latest/docs/classes/Docs.html) para la integración con servicios de Google (pendiente de detalles específicos).
- [Cloudinary](https://cloudinary.com/documentation) para el almacenamiento y gestión de archivos multimedia en la nube.
- [ESLint](https://eslint.org/docs/latest/) para el linting del código.
- [Prettier](https://prettier.io) para el formateo consistente del código.

## Descripción extensa del proyecto, dirección del mismo y objetivos a lograr

# TaskTalk

TaskTalk aspira a convertirse en una aplicación diseñada para el ámbito profesional y educativo. Se espera que su implementación en estos campos agilice y optimice tanto el trabajo como la comunicación en grupo, ya sea en entornos laborales o académicos. Además, se vislumbran posibles usos de la aplicación a nivel P2P o individual, facilitando la creación de tareas y listas para cualquier propósito.

En la versión actual del proyecto, aunque dista de alcanzar la visión completa de la aplicación, ya cuenta con numerosas utilidades funcionales en el backend, como se detalla en **Funcionalidades Principales**. También presenta una versión inicial y rudimentaria del frontend, que será desarrollado de manera más completa, cómoda y estéticamente agradable.

## Instalación y Ejecución
1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura las variables de entorno en un archivo `.env`.
4. Ejecuta `npm run dev` para iniciar el servidor en modo de desarrollo con nodemon.

**Nota:** El proyecto está en desarrollo, por lo que la funcionalidad de mensajería al completo no existe en esta versión del proyecto, de igual manera, el frontend está en una fase muy primitiva y queda será mejorado enormemente.
