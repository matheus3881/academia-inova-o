/*
  Warnings:

  - The primary key for the `residentialData` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "residentialData" DROP CONSTRAINT "residentialData_address_fkey";

-- AlterTable
ALTER TABLE "academicData" ALTER COLUMN "gpa" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "academicData_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "academicData_id_key";

-- AlterTable
ALTER TABLE "emergency" ADD CONSTRAINT "emergency_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "emergency_id_key";

-- AlterTable
ALTER TABLE "residentialData" DROP CONSTRAINT "residentialData_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "residentialData_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "residentialData_id_seq";

-- AddForeignKey
ALTER TABLE "residentialData" ADD CONSTRAINT "residentialData_id_fkey" FOREIGN KEY ("id") REFERENCES "personalData"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
