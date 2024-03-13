-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'SUBADMIN');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hub" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "vehicleNumber" TEXT NOT NULL,
    "superVisorName" TEXT NOT NULL,
    "superVisorContact" TEXT NOT NULL,

    CONSTRAINT "Hub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardHolder" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "familyCount" INTEGER NOT NULL,

    CONSTRAINT "CardHolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyMember" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "cardHolderId" TEXT,

    CONSTRAINT "FamilyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" JSONB NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "hubIds" TEXT[],

    CONSTRAINT "Ration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HubToRation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Hub_name_key" ON "Hub"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Hub_address_key" ON "Hub"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Hub_vehicleNumber_key" ON "Hub"("vehicleNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Hub_superVisorContact_key" ON "Hub"("superVisorContact");

-- CreateIndex
CREATE UNIQUE INDEX "CardHolder_firstName_key" ON "CardHolder"("firstName");

-- CreateIndex
CREATE UNIQUE INDEX "CardHolder_lastName_key" ON "CardHolder"("lastName");

-- CreateIndex
CREATE UNIQUE INDEX "CardHolder_number_key" ON "CardHolder"("number");

-- CreateIndex
CREATE UNIQUE INDEX "CardHolder_email_key" ON "CardHolder"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CardHolder_address_key" ON "CardHolder"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_number_key" ON "Admin"("number");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyMember_fullName_key" ON "FamilyMember"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Ration_name_key" ON "Ration"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_HubToRation_AB_unique" ON "_HubToRation"("A", "B");

-- CreateIndex
CREATE INDEX "_HubToRation_B_index" ON "_HubToRation"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_cardHolderId_fkey" FOREIGN KEY ("cardHolderId") REFERENCES "CardHolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HubToRation" ADD CONSTRAINT "_HubToRation_A_fkey" FOREIGN KEY ("A") REFERENCES "Hub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HubToRation" ADD CONSTRAINT "_HubToRation_B_fkey" FOREIGN KEY ("B") REFERENCES "Ration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
