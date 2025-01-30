/*
  Warnings:

  - You are about to drop the column `cpf` on the `academicData` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `emergency` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `residentialData` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "academicData" DROP CONSTRAINT "academicData_cpf_fkey";

-- DropForeignKey
ALTER TABLE "emergency" DROP CONSTRAINT "emergency_cpf_fkey";

-- DropForeignKey
ALTER TABLE "residentialData" DROP CONSTRAINT "residentialData_cpf_fkey";

-- AlterTable
ALTER TABLE "academicData" DROP COLUMN "cpf";

-- AlterTable
ALTER TABLE "emergency" DROP COLUMN "cpf";

-- AlterTable
ALTER TABLE "residentialData" DROP COLUMN "cpf";
