import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN CREATE TYPE "public"."enum_projects_code_snippet_language" AS ENUM('typescript', 'tsx', 'javascript', 'php', 'css', 'html', 'json', 'sql'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__projects_v_version_code_snippet_language" AS ENUM('typescript', 'tsx', 'javascript', 'php', 'css', 'html', 'json', 'sql'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "code_snippet_filename" varchar;
  ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "code_snippet_language" "enum_projects_code_snippet_language";
  ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "code_snippet_code" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN IF NOT EXISTS "version_code_snippet_filename" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN IF NOT EXISTS "version_code_snippet_language" "enum__projects_v_version_code_snippet_language";
  ALTER TABLE "_projects_v" ADD COLUMN IF NOT EXISTS "version_code_snippet_code" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" DROP COLUMN "code_snippet_filename";
  ALTER TABLE "projects" DROP COLUMN "code_snippet_language";
  ALTER TABLE "projects" DROP COLUMN "code_snippet_code";
  ALTER TABLE "_projects_v" DROP COLUMN "version_code_snippet_filename";
  ALTER TABLE "_projects_v" DROP COLUMN "version_code_snippet_language";
  ALTER TABLE "_projects_v" DROP COLUMN "version_code_snippet_code";
  DROP TYPE "public"."enum_projects_code_snippet_language";
  DROP TYPE "public"."enum__projects_v_version_code_snippet_language";`)
}
