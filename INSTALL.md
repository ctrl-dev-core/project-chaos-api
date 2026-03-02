# Project Chaos API - Instalación

![NestJS](https://img.shields.io/badge/NestJS-303030?style=flat-square&logo=nestjs&logoColor=E0234E)
![Prisma](https://img.shields.io/badge/Prisma-303030?style=flat-square&logo=prisma&logoColor=2D3748)
![Docker](https://img.shields.io/badge/Docker-303030?style=flat-square&logo=docker&logoColor=2496ED)
![pnpm](https://img.shields.io/badge/pnpm-303030?style=flat-square&logo=pnpm&logoColor=F69220)
![Swagger](https://img.shields.io/badge/Swagger-303030?style=flat-square&logo=swagger&logoColor=85EA2D)

Guía completa para configurar y ejecutar el proyecto Project Chaos API.

---

## Requisitos Previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [pnpm](https://pnpm.io/installation)
- [Git](https://git-scm.com/)

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ctrl-dev-core/project-chaos-api.git
cd project-chaos-api
```

### 2. Copiar variables de entorno

```bash
cp .env.sample .env
```

El archivo `.env` contiene la configuración de la base de datos. Por defecto usa SQLite:

```env
#BASIC CONFIGURATION
HOST=localhost
PORT=3000

#FRONTEND
FRONTEND_URL=http://localhost:3030

#NAME OF DATABASE
DATABASE_URL="file:./database/database.db"
```

> ⚠️ El archivo `.env` está en `.gitignore` y nunca debe subirse al repositorio.

### 3. Instalar dependencias

```bash
pnpm install
```

Este comando también ejecuta automáticamente el script `prepare` de Husky para configurar los git hooks.

### 4. Generar cliente Prisma y ejecutar migraciones

```bash
pnpm run prisma:generate
pnpm run prisma:migrate
```

---

## Ejecutar el Proyecto

### Modo desarrollo (con hot-reload)

```bash
pnpm run start:dev
```

La API estará disponible en: **http://localhost:3000**

> La documentación Swagger estará disponible en **http://localhost:3000/docs**

### Modo producción

```bash
pnpm run build
pnpm run start:prod
```

---

## Base de Datos (Prisma)

### Comandos útiles

| Comando                    | Descripción                          |
| -------------------------- | ------------------------------------ |
| `pnpm run prisma:generate` | Genera el cliente Prisma             |
| `pnpm run prisma:migrate`  | Ejecuta las migraciones pendientes   |
| `pnpm run prisma:studio`   | Abre Prisma Studio (interfaz visual) |
| `pnpm run seed`            | Ejecuta el seed de la base de datos  |

---

## Scripts Disponibles

| Script              | Comando                    | Descripción                                      |
| ------------------- | -------------------------- | ------------------------------------------------ |
| **start**           | `pnpm run start`           | Inicia la aplicación                             |
| **start:dev**       | `pnpm run start:dev`       | Inicia en modo desarrollo (watch)                |
| **start:debug**     | `pnpm run start:debug`     | Inicia en modo debug con watch                   |
| **start:prod**      | `pnpm run start:prod`      | Inicia en modo producción                        |
| **build**           | `pnpm run build`           | Compila el proyecto                              |
| **lint**            | `pnpm run lint`            | Ejecuta ESLint                                   |
| **lint:fix**        | `pnpm run lint:fix`        | Ejecuta ESLint y corrige errores automáticamente |
| **format**          | `pnpm run format`          | Formatea el código con Prettier                  |
| **test**            | `pnpm run test`            | Ejecuta los tests unitarios                      |
| **test:watch**      | `pnpm run test:watch`      | Ejecuta los tests en modo watch                  |
| **test:cov**        | `pnpm run test:cov`        | Ejecuta los tests con reporte de cobertura       |
| **test:e2e**        | `pnpm run test:e2e`        | Ejecuta los tests end-to-end                     |
| **commit**          | `pnpm run commit`          | Abre Commitizen para un commit guiado            |
| **prisma:generate** | `pnpm run prisma:generate` | Genera el cliente Prisma                         |
| **prisma:migrate**  | `pnpm run prisma:migrate`  | Ejecuta las migraciones de la BD                 |
| **prisma:studio**   | `pnpm run prisma:studio`   | Abre Prisma Studio                               |

---

## Linting y Formateo de Código

### ESLint

```bash
# Verificar errores
pnpm run lint

# Corregir errores automáticamente
pnpm run lint:fix
```

### Prettier

```bash
pnpm run format
```

---

## Testing

```bash
# Tests unitarios
pnpm run test

# Tests en modo watch
pnpm run test:watch

# Reporte de cobertura
pnpm run test:cov

# Tests end-to-end
pnpm run test:e2e
```

---

## Conventional Commits

Este proyecto sigue el estándar de [Conventional Commits](https://www.conventionalcommits.org/). Para hacer un commit:

```bash
pnpm run commit
```

Esto abrirá un asistente interactivo que te guiará paso a paso.

### Tipos de commit

| Tipo       | Descripción                               |
| ---------- | ----------------------------------------- |
| `feat`     | Nueva funcionalidad                       |
| `fix`      | Corrección de un bug                      |
| `docs`     | Cambios en documentación                  |
| `style`    | Formato de código (sin cambios en lógica) |
| `refactor` | Refactorización de código                 |
| `perf`     | Mejora de rendimiento                     |
| `test`     | Agregar o corregir tests                  |
| `build`    | Cambios en el sistema de build            |
| `ci`       | Cambios en la integración continua        |
| `chore`    | Tareas de mantenimiento                   |
| `revert`   | Revertir un commit anterior               |

### Git Hooks (Husky)

| Hook           | Acción                                  |
| -------------- | --------------------------------------- |
| **pre-commit** | Ejecuta tests y lint antes del commit   |
| **commit-msg** | Valida el formato del mensaje de commit |

---

## Configuración de Puertos

| Servicio | Puerto |
| -------- | ------ |
| API      | 3000   |
| Swagger  | /docs  |

---

<p align="center">
  Hecho con ❤️ por la comunidad <strong>ctrl dev</strong>
</p>
