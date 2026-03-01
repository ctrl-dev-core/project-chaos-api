-- CreateTable
CREATE TABLE "plan" (
    "id_plan" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "semestre" (
    "id_semestre" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "docente" (
    "id_docente" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "correo" TEXT
);

-- CreateTable
CREATE TABLE "materia" (
    "id_materia" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "id_plan" INTEGER NOT NULL,
    "id_semestre" INTEGER NOT NULL,
    "id_prerrequisito" INTEGER,
    "sigla" TEXT NOT NULL,
    CONSTRAINT "materia_id_plan_fkey" FOREIGN KEY ("id_plan") REFERENCES "plan" ("id_plan") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "materia_id_semestre_fkey" FOREIGN KEY ("id_semestre") REFERENCES "semestre" ("id_semestre") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "materia_id_prerrequisito_fkey" FOREIGN KEY ("id_prerrequisito") REFERENCES "materia" ("id_materia") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "horario" (
    "id_horario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_materia" INTEGER NOT NULL,
    "id_docente" INTEGER NOT NULL,
    "dia" TEXT NOT NULL,
    "hora_inicio" TEXT NOT NULL,
    "hora_fin" TEXT NOT NULL,
    "paralelo" TEXT NOT NULL,
    CONSTRAINT "horario_id_materia_fkey" FOREIGN KEY ("id_materia") REFERENCES "materia" ("id_materia") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "horario_id_docente_fkey" FOREIGN KEY ("id_docente") REFERENCES "docente" ("id_docente") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "materia_id_plan_idx" ON "materia"("id_plan");

-- CreateIndex
CREATE INDEX "materia_id_semestre_idx" ON "materia"("id_semestre");

-- CreateIndex
CREATE INDEX "materia_id_prerrequisito_idx" ON "materia"("id_prerrequisito");

-- CreateIndex
CREATE INDEX "horario_id_materia_idx" ON "horario"("id_materia");

-- CreateIndex
CREATE INDEX "horario_id_docente_idx" ON "horario"("id_docente");
