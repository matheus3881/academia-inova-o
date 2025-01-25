/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "personalData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,

    CONSTRAINT "personalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "residentialData" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "residentialData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academicData" (
    "id" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "yearOfEntry" INTEGER NOT NULL,
    "currentSemester" INTEGER NOT NULL,
    "academicStatus" TEXT NOT NULL,
    "gpa" INTEGER,
    "educationMode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "emergency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "personalData_cpf_key" ON "personalData"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "academicData_id_key" ON "academicData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "emergency_id_key" ON "emergency"("id");

-- AddForeignKey
ALTER TABLE "residentialData" ADD CONSTRAINT "residentialData_address_fkey" FOREIGN KEY ("address") REFERENCES "personalData"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academicData" ADD CONSTRAINT "academicData_id_fkey" FOREIGN KEY ("id") REFERENCES "personalData"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency" ADD CONSTRAINT "emergency_id_fkey" FOREIGN KEY ("id") REFERENCES "personalData"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
