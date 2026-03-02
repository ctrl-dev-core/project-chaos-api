# Project Chaos API

![NestJS](https://img.shields.io/badge/NestJS-303030?style=flat-square&logo=nestjs&logoColor=E0234E)
![Prisma](https://img.shields.io/badge/Prisma-303030?style=flat-square&logo=prisma&logoColor=2D3748)
![Docker](https://img.shields.io/badge/Docker-303030?style=flat-square&logo=docker&logoColor=2496ED)
![pnpm](https://img.shields.io/badge/pnpm-303030?style=flat-square&logo=pnpm&logoColor=F69220)
![Swagger](https://img.shields.io/badge/Swagger-303030?style=flat-square&logo=swagger&logoColor=85EA2D)

> API pública de materias de la carrera de Informática — Comunidad **ctrl dev**

---

## Descripción

**Project Chaos API** es una API REST desarrollada con [NestJS](https://nestjs.com/) que expone información pública sobre las materias, planes de estudio, horarios y docentes de la carrera de Informática. Es un proyecto de la comunidad **ctrl dev** orientado a facilitar el acceso a datos académicos de manera programática.

---

## Tech Stack

| Tecnología     | Versión | Descripción                         |
| -------------- | ------- | ----------------------------------- |
| **NestJS**     | v11     | Framework backend de Node.js        |
| **TypeScript** | v5      | Lenguaje tipado                     |
| **Prisma ORM** | v7      | ORM para acceso a base de datos     |
| **SQLite**     | —       | Base de datos local                 |
| **Docker**     | —       | Contenedor para la base de datos    |
| **Swagger**    | —       | Documentación interactiva de la API |
| **pnpm**       | —       | Gestor de paquetes                  |

---

## Features

- **RESTful API**: Endpoints para gestionar materias, docentes, planes de estudio, horarios y semestres.
- **ORM con Prisma**: Gestión eficiente de la base de datos SQLite.
- **Documentación interactiva**: Swagger disponible en `/docs`.
- **Estructura modular**: Organización en módulos (materias, docentes, planes, horarios, semestres).
- **Validación de datos**: Implementa `class-validator` para DTOs.
- **Conventional Commits**: Commits estandarizados con Commitizen y Husky.
- **Testing**: Jest para tests unitarios y E2E.

---

## Estructura del Proyecto

```
project-chaos-api/
├── prisma/                    # Schema y migraciones de Prisma
├── src/
│   ├── app/                   # Módulos de la aplicación
│   │   ├── materias/          # Módulo de materias
│   │   ├── docentes/          # Módulo de docentes
│   │   ├── planes/            # Módulo de planes de estudio
│   │   ├── horarios/          # Módulo de horarios
│   │   ├── semestres/         # Módulo de semestres
│   │   └── prisma/            # Servicio de Prisma
│   ├── core/                  # Configuraciones globales
│   │   └── global/            # DTOs, interceptors, filtros
│   ├── app.module.ts          # Módulo raíz
│   └── main.ts                # Punto de entrada
├── test/                      # Tests E2E
└── package.json               # Dependencias y scripts
```

---

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu feature:
   ```bash
   git checkout -b feat/mi-nueva-feature
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   pnpm run commit
   ```
4. Sube tu rama y abre un Pull Request

---

<p align="center">
  Hecho con ❤️ por la comunidad <strong>ctrl dev</strong>
</p>
