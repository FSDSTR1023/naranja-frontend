# TODO-MESSENGER-GROUP-MANAGER (TASKTALK)

## Descripción General del Proyecto(TLDR)

Este proyecto es una aplicación de gestión de tareas y mensajería grupal. Permite a los usuarios registrarse, crear tareas, asignarse entre sí y unirse a grupos para comunicarse a través de mensajes grupales o individuales (ya sea texto, vídeo, archivo o imágenes). El proyecto está en desarrollo, con la funcionalidad del chat y la mayoría del frontend pendientes de implementación.

## Instalación y Ejecución

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura las variables de entorno en un archivo `.env`.
4. Ejecuta `npm run dev` para iniciar el servidor en modo de desarrollo con nodemon.

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

## Arquitectura del Proyecto TaskTalk y Relaciones entre Entidades  

TaskTalk se construye como una aplicación web utilizando la pila MERN (MongoDB, Express.js, React, Node.js) para sus componentes de backend y frontend. El proyecto sigue una arquitectura modular y escalable para garantizar la mantenibilidad y extensibilidad.

### Arquitectura del Backend

- **Servidor:** Express.js se utiliza como el marco del servidor para manejar las solicitudes y respuestas HTTP.

- **Base de Datos:** MongoDB es la base de datos NoSQL elegida, y Mongoose se utiliza como un ODM (Object Document Mapper) para modelar e interactuar con la base de datos.

- **Autenticación:** Se emplean Tokens de Web JSON (JWT) para la autenticación del usuario. Bcrypt.js se utiliza para el hash de las contraseñas de usuario.

- **Middleware:** Diversos middleware, como Morgan para el registro, Cookie-parser para el manejo de cookies y CORS para el intercambio de recursos entre dominios, se integran en la aplicación Express.js.

- **Comunicación en Tiempo Real (Pendiente):** Socket.io está planeado para implementar la funcionalidad de mensajería en tiempo real.

- **Verificación de Correo Electrónico:** Nodemailer se utiliza para enviar correos electrónicos de verificación durante el proceso de registro del usuario.

- **Almacenamiento en la Nube:** Cloudinary está implementado para gestionar archivos multimedia en la nube.

### Arquitectura del Frontend

- **Framework:** React.js se elige como la biblioteca frontend para construir interfaces de usuario.

- **Gestión del Estado:** El proyecto utiliza una combinación del estado local de React y la API de contexto para gestionar el estado de la aplicación.

- **Enrutamiento:** React Router se utiliza para manejar la navegación dentro de la aplicación.

- **Solicitudes a la API:** Axios se utiliza para realizar solicitudes HTTP a la API del backend.

- **Manejo de Formularios:** React Hook Form se utiliza para el manejo eficiente y efectivo de formularios en los componentes de React.

## Relaciones entre Entidades

### Usuario

- Un Usuario puede estar asociado con muchas Tareas.
- Un Usuario puede ser miembro de varios Grupos.
- Un Usuario puede enviar y recibir Mensajes dentro de un Grupo, ya sea de 2 o más miembros.
- Cada Usuario tiene un token de autenticación único.

### Tarea

- Una Tarea pertenece a un Usuario (creador/asignatario).
- Una Tarea puede estar asociada con varios Usuarios (asignatarios).
- Las Tareas pueden pertenecer a uno o más Grupos.

### Grupo

- Un Grupo puede tener múltiples Usuarios como miembros.
- Un Grupo puede tener múltiples Tareas asociadas.
- Los Mensajes se intercambian entre Usuarios dentro de un Grupo.

### Mensaje

- Un Mensaje está asociado con un Grupo específico.
- Los Mensajes pueden incluir texto, video, archivos o imágenes.
- Cada Mensaje es enviado por un Usuario específico dentro del Grupo.

Esta arquitectura y modelo de relaciones entre entidades proporcionan una base para construir la aplicación TaskTalk con características como la gestión de tareas, la comunicación grupal y la mensajería en tiempo real.

## Descripción extensa del proyecto, dirección del mismo y objetivos a lograr

# TaskTalk(Nombre provisional)

TaskTalk aspira a convertirse en una aplicación diseñada para el ámbito profesional y educativo. Se espera que su implementación en estos campos agilice y optimice tanto el trabajo como la comunicación en grupo, ya sea en entornos laborales o académicos. Además, se vislumbran posibles usos de la aplicación a nivel P2P o individual, facilitando la creación de tareas y listas para cualquier propósito.

En la versión actual del proyecto, aunque dista de alcanzar la visión completa de la aplicación, ya cuenta con numerosas utilidades funcionales en el backend, como se detalla en **Funcionalidades Principales**. También presenta una versión inicial y rudimentaria del frontend, que será desarrollado de manera más completa, cómoda y estéticamente agradable.

**Nota:** El proyecto está en desarrollo, por lo que la funcionalidad de mensajería al completo no existe en esta versión del proyecto, de igual manera, el frontend está en una fase muy primitiva y queda será mejorado enormemente.
