-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('ALIMENTACAO', 'SAUDE', 'LAZER', 'ROUPAS_E_ACESSORIOS', 'DIVIDAS', 'CONTAS', 'OUTROS_TIPOS_DE_GASTOS');

-- AlterTable
ALTER TABLE "finance" ADD COLUMN     "category" "CategoryType";
