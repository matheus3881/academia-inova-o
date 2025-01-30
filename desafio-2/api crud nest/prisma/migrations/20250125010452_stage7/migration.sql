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
    "personalId" INTEGER NOT NULL,

    CONSTRAINT "residentialData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academicData" (
    "id" SERIAL NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "yearOfEntry" INTEGER NOT NULL,
    "currentSemester" INTEGER NOT NULL,
    "academicStatus" TEXT NOT NULL,
    "gpa" DOUBLE PRECISION,
    "educationMode" TEXT NOT NULL,
    "personalId" INTEGER NOT NULL,

    CONSTRAINT "academicData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "personalId" INTEGER NOT NULL,

    CONSTRAINT "emergency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personalData_cpf_key" ON "personalData"("cpf");

-- AddForeignKey
ALTER TABLE "residentialData" ADD CONSTRAINT "residentialData_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "personalData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academicData" ADD CONSTRAINT "academicData_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "personalData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency" ADD CONSTRAINT "emergency_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "personalData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
