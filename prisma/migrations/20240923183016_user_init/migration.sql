-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "about_info" TEXT,
    "tagline" TEXT,
    "experience" TEXT,
    "profile_pic" TEXT,
    "city_name" TEXT,
    "occupation" TEXT,
    "address" TEXT,
    "date_of_birtha" TIMESTAMP(3) NOT NULL,
    "datails" JSONB,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_mobile_key" ON "user"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
