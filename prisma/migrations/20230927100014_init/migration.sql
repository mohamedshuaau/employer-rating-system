-- CreateTable
CREATE TABLE `employers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contact_number` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `point_rating` INTEGER NOT NULL DEFAULT 0,
    `star_rating` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `employers_email_key`(`email`),
    UNIQUE INDEX `employers_contact_number_key`(`contact_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employer_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employer_id` INTEGER NOT NULL,
    `contribution_month` VARCHAR(191) NOT NULL,
    `payment_date` VARCHAR(191) NULL,
    `due_date` VARCHAR(191) NOT NULL,
    `paid_amount` DECIMAL(9, 2) NULL,
    `payment_status` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employer_payments` ADD CONSTRAINT `employer_payments_employer_id_fkey` FOREIGN KEY (`employer_id`) REFERENCES `employers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
