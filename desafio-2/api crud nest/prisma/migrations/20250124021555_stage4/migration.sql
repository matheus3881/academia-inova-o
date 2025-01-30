/*
  Warnings:

  - The primary key for the `academicData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `academicData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `emergency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `emergency` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `residentialData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `residentialData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `cpf` to the `academicData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `emergency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `residentialData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "academicData" DROP CONSTRAINT "academicData_id_fkey";

-- DropForeignKey
ALTER TABLE "emergency" DROP CONSTRAINT "emergency_id_fkey";

-- DropForeignKey
ALTER TABLE "residentialData" DROP CONSTRAINT "residentialData_id_fkey";

-- AlterTable
ALTER TABLE "academicData" DROP CONSTRAINT "academicData_pkey",
ADD COLUMN     "cpf" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "academicData_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "emergency" DROP CONSTRAINT "emergency_pkey",
ADD COLUMN     "cpf" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "emergency_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "residentialData" DROP CONSTRAINT "residentialData_pkey",
ADD COLUMN     "cpf" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "residentialData_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "residentialData" ADD CONSTRAINT "residentialData_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "personalData"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academicData" ADD CONSTRAINT "academicData_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "personalData"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency" ADD CONSTRAINT "emergency_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "personalData"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
