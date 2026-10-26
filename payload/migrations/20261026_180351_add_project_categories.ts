import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_projects_category" ADD VALUE IF NOT EXISTS 'Next.js' BEFORE 'React';
  ALTER TYPE "public"."enum_projects_category" ADD VALUE IF NOT EXISTS 'NestJS' BEFORE 'Laravel';
  ALTER TYPE "public"."enum_projects_category" ADD VALUE IF NOT EXISTS 'Full-Stack';
  ALTER TYPE "public"."enum__projects_v_version_category" ADD VALUE IF NOT EXISTS 'Next.js' BEFORE 'React';
  ALTER TYPE "public"."enum__projects_v_version_category" ADD VALUE IF NOT EXISTS 'NestJS' BEFORE 'Laravel';
  ALTER TYPE "public"."enum__projects_v_version_category" ADD VALUE IF NOT EXISTS 'Full-Stack';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ALTER COLUMN "category" SET DATA TYPE text;
  DROP TYPE "public"."enum_projects_category";
  CREATE TYPE "public"."enum_projects_category" AS ENUM('Webflow', 'React', 'Laravel');
  ALTER TABLE "projects" ALTER COLUMN "category" SET DATA TYPE "public"."enum_projects_category" USING "category"::"public"."enum_projects_category";
  ALTER TABLE "_projects_v" ALTER COLUMN "version_category" SET DATA TYPE text;
  DROP TYPE "public"."enum__projects_v_version_category";
  CREATE TYPE "public"."enum__projects_v_version_category" AS ENUM('Webflow', 'React', 'Laravel');
  ALTER TABLE "_projects_v" ALTER COLUMN "version_category" SET DATA TYPE "public"."enum__projects_v_version_category" USING "version_category"::"public"."enum__projects_v_version_category";`)
}
