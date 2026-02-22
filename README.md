#  Project Chaos API

> API pública de materias de la carrera de Informática — Comunidad **ctrl dev**

[![NestJS](https://img.shields.io/badge/NestJS-v11-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-v7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![pnpm](https://img.shields.io/badge/pnpm-package%20manager-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

---

##  Tabla de Contenidos

- [Descripción](#-descripción)
- [Tech Stack](#-tech-stack)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Ejecutar el Proyecto](#-ejecutar-el-proyecto)
- [Base de Datos (Prisma)](#-base-de-datos-prisma)
- [Documentación API (Swagger)](#-documentación-api-swagger)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Modelo de Datos](#-modelo-de-datos)
- [Conventional Commits con Commitizen](#-conventional-commits-con-commitizen)
- [Linting y Formateo de Código](#-linting-y-formateo-de-código)
- [Testing](#-testing)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

##  Descripción

**Project Chaos API** es una API REST desarrollada con [NestJS](https://nestjs.com/) que expone información pública sobre las materias, planes de estudio, horarios y docentes de la carrera de Informática. Es un proyecto de la comunidad **ctrl dev** orientado a facilitar el acceso a datos académicos de manera programática.

---

##  Tech Stack

| Tecnología | Versión | Descripción |
|---|---|---|
| **NestJS** | v11 | Framework backend de Node.js |
| **TypeScript** | v5 | Lenguaje tipado |
| **Prisma ORM** | v7 | ORM para acceso a base de datos |
| **PostgreSQL** | 16 (Alpine) | Base de datos relacional |
| **Docker** | — | Contenedor para la base de datos |
| **Swagger** | — | Documentación interactiva de la API |
| **pnpm** | — | Gestor de paquetes rápido y eficiente |
| **Commitizen** | — | Commits estandarizados |
| **Husky** | v9 | Git hooks automatizados |
| **CommitLint** | — | Validación de mensajes de commit |
| **ESLint** | v9 | Linter para TypeScript |
| **Prettier** | v3 | Formateador de código |
| **Jest** | v30 | Framework de testing |

---

##  Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **pnpm** — [Guía de instalación](https://pnpm.io/installation)
  ```bash
  npm install -g pnpm
  ```
- **Docker y Docker Compose** — [Descargar Docker](https://docs.docker.com/get-docker/)
- **Git**

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/ctrl-dev-core/project-chaos-api.git
cd project-chaos-api
```

### 2. Configurar las variables de entorno

Copia el archivo de ejemplo `.env.sample` a `.env`:

```bash
cp .env.sample .env
```

El archivo `.env` contiene la cadena de conexión a la base de datos. Por defecto viene configurado para el contenedor Docker local.

> ⚠️ **Importante:** El archivo `.env` está incluido en `.gitignore` y **nunca** debe subirse al repositorio. Cada desarrollador debe crear su propia copia local.

### 3. Instalar dependencias

```bash
pnpm install
```

> Esto también ejecuta automáticamente `husky` (script `prepare`) para configurar los git hooks.

### 4. Levantar la base de datos con Docker

```bash
docker-compose up -d
```

Esto levanta un contenedor con **PostgreSQL 16 Alpine** con la siguiente configuración:

| Parámetro | Valor |
|---|---|
| **Host** | `localhost` |
| **Puerto** | `5432` |
| **Usuario** | `admin` |
| **Contraseña** | `password123` |
| **Base de datos** | `chaos_api_db` |
| **Nombre del contenedor** | `chaos_db` |

Los datos persisten en el volumen Docker `chaos_data`.

### 5. Ejecutar las migraciones de Prisma

Genera el cliente Prisma y aplica las migraciones:

```bash
pnpm run prisma:generate
pnpm run prisma:migrate
```

---

##  Ejecutar el Proyecto

### Modo desarrollo (con hot-reload)

```bash
pnpm run start:dev
```

La API estará disponible en: **http://localhost:3000**

### Modo producción

```bash
pnpm run build
pnpm run start:prod
```

---

##  Base de Datos (Prisma)

El proyecto utiliza **Prisma ORM** para gestionar la base de datos. El schema se encuentra en `prisma/schema.prisma` y la configuración en `prisma.config.ts`.

### Comandos útiles

| Comando | Descripción |
|---|---|
| `pnpm run prisma:generate` | Genera el cliente Prisma |
| `pnpm run prisma:migrate` | Ejecuta las migraciones pendientes |
| `pnpm run prisma:studio` | Abre Prisma Studio (interfaz visual para la DB) |

### Verificar la conexión

Para verificar que la base de datos está conectada correctamente, puedes abrir Prisma Studio:

```bash
pnpm run prisma:studio
```

Esto abrirá una interfaz web donde puedes visualizar y editar los datos.

---

##  Documentación API (Swagger)

La documentación interactiva de la API está disponible automáticamente cuando el servidor está corriendo:

 **http://localhost:3000/docs**

Aquí puedes explorar todos los endpoints disponibles, ver los esquemas de datos y probar las peticiones directamente desde el navegador.

---

##  Scripts Disponibles

| Script | Comando | Descripción |
|---|---|---|
| **start** | `pnpm run start` | Inicia la aplicación |
| **start:dev** | `pnpm run start:dev` | Inicia en modo desarrollo (watch) |
| **start:debug** | `pnpm run start:debug` | Inicia en modo debug con watch |
| **start:prod** | `pnpm run start:prod` | Inicia en modo producción |
| **build** | `pnpm run build` | Compila el proyecto |
| **lint** | `pnpm run lint` | Ejecuta ESLint |
| **lint:fix** | `pnpm run lint:fix` | Ejecuta ESLint y corrige errores automáticamente |
| **format** | `pnpm run format` | Formatea el código con Prettier |
| **test** | `pnpm run test` | Ejecuta los tests unitarios |
| **test:watch** | `pnpm run test:watch` | Ejecuta los tests en modo watch |
| **test:cov** | `pnpm run test:cov` | Ejecuta los tests con reporte de cobertura |
| **test:e2e** | `pnpm run test:e2e` | Ejecuta los tests end-to-end |
| **commit** | `pnpm run commit` | Abre Commitizen para hacer un commit guiado |
| **prisma:generate** | `pnpm run prisma:generate` | Genera el cliente Prisma |
| **prisma:migrate** | `pnpm run prisma:migrate` | Ejecuta migraciones de la BD |
| **prisma:studio** | `pnpm run prisma:studio` | Abre Prisma Studio |

---

##  Estructura del Proyecto

```
project-chaos-api/
├── prisma/                          # Prisma ORM
│   ├── migrations/                  # Migraciones de la base de datos
│   └── schema.prisma                # Esquema de la base de datos
├── src/                             # Código fuente
│   ├── prisma/                      # Módulo de Prisma (servicio + módulo)
│   │   ├── prisma.module.ts         # Módulo de Prisma para NestJS
│   │   ├── prisma.service.ts        # Servicio de conexión a la BD
│   │   └── prisma.service.spec.ts   # Tests del servicio Prisma
│   ├── app.controller.ts            # Controlador principal
│   ├── app.controller.spec.ts       # Tests del controlador
│   ├── app.module.ts                # Módulo raíz de la aplicación
│   ├── app.service.ts               # Servicio principal
│   └── main.ts                      # Punto de entrada de la aplicación
├── test/                            # Tests end-to-end
│   ├── app.e2e-spec.ts              # Test E2E de la aplicación
│   └── jest-e2e.json                # Config de Jest para E2E
├── .husky/                          # Git hooks con Husky
│   ├── commit-msg                   # Hook: valida el mensaje de commit
│   └── pre-commit                   # Hook: ejecuta tests y lint antes del commit
├── .commitlintrc.json               # Configuración de CommitLint
├── .env.sample                      # Ejemplo de variables de entorno
├── .gitignore                       # Archivos ignorados por Git
├── .prettierrc                      # Configuración de Prettier
├── docker-compose.yml               # Docker Compose para PostgreSQL
├── eslint.config.mjs                # Configuración de ESLint (flat config)
├── nest-cli.json                    # Configuración del CLI de NestJS
├── package.json                     # Dependencias y scripts
├── pnpm-lock.yaml                   # Lockfile de pnpm
├── prisma.config.ts                 # Configuración de Prisma (datasource URL)
├── tsconfig.json                    # Configuración de TypeScript
└── tsconfig.build.json              # Config de TypeScript para build
```

---

##  Conventional Commits con Commitizen

Este proyecto sigue el estándar de [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial de cambios limpio y consistente. Para facilitar esto, usamos **Commitizen** junto con **CommitLint** y **Husky**.

### ¿Cómo hacer un commit?

En lugar de usar `git commit`, utiliza el siguiente comando:

```bash
pnpm run commit
```

Esto abrirá un **asistente interactivo** que te guiará paso a paso para crear un mensaje de commit correctamente formateado:

1. **Tipo de cambio** — Selecciona el tipo (feat, fix, docs, etc.)
2. **Scope** — Indica el ámbito del cambio (opcional)
3. **Descripción corta** — Resume tu cambio en una línea
4. **Descripción larga** — Detalla los cambios (opcional)
5. **Breaking changes** — Indica si hay cambios que rompen compatibilidad (opcional)
6. **Issues** — Referencia issues relacionados (opcional)

### Tipos de commit permitidos

| Tipo | Descripción |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de un bug |
| `docs` | Cambios en documentación |
| `style` | Formato de código (sin cambios en lógica) |
| `refactor` | Refactorización de código |
| `perf` | Mejora de rendimiento |
| `test` | Agregar o corregir tests |
| `build` | Cambios en el sistema de build |
| `ci` | Cambios en la integración continua |
| `chore` | Tareas de mantenimiento |
| `revert` | Revertir un commit anterior |

### Ejemplo de commits válidos

```
feat(subjects): agregar endpoint para listar materias por semestre
fix(prisma): corregir relación de prerequisitos
docs(readme): actualizar instrucciones de instalación
refactor(auth): mejorar manejo de errores en autenticación
```

### Git Hooks automáticos (Husky)

Los siguientes hooks se ejecutan automáticamente:

| Hook | Acción |
|---|---|
| **pre-commit** | Ejecuta `pnpm test` y `pnpm run lint` antes de cada commit |
| **commit-msg** | Valida que el mensaje de commit siga el formato de Conventional Commits |

> 💡 Si el mensaje de commit no sigue el formato correcto, el commit será **rechazado** automáticamente.

---

##  Linting y Formateo de Código

### ESLint

El proyecto usa ESLint v9 con **flat config** (`eslint.config.mjs`). Incluye reglas estrictas para:

- ✅ **Seguridad asíncrona** — No dejar promesas sin manejar (crítico para Prisma)
- ✅ **Calidad de código** — Tipado estricto, comparaciones con `===`, llaves obligatorias
- ✅ **Integración con Prettier** — Formato consistente

```bash
# Verificar errores
pnpm run lint

# Corregir errores automáticamente
pnpm run lint:fix
```

### Prettier

Configuración en `.prettierrc`:

```json
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

```bash
pnpm run format
```

---

##  Testing

El proyecto usa **Jest** como framework de testing.

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

## 🤝 Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu feature:
   ```bash
   git checkout -b feat/mi-nueva-feature
   ```
3. Realiza tus cambios y haz commit con Commitizen:
   ```bash
   pnpm run commit
   ```
4. Sube tu rama:
   ```bash
   git push origin feat/mi-nueva-feature
   ```
5. Abre un Pull Request en GitHub

> Recuerda que el hook **pre-commit** ejecutará los tests y el linter automáticamente. Asegúrate de que todo pase antes de hacer push.

---

## 📄 Licencia

Este proyecto es de uso privado / UNLICENSED.

---

<p align="center">
  Hecho con ❤️ por la comunidad <strong>ctrl dev</strong>
</p>
