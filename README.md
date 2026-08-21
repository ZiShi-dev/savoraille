# Savoraill

Monorepo du site de restaurant Savoraill, conçu pour fonctionner entièrement en local pendant la première phase du projet.

## Architecture

- `apps/web` : frontend Next.js, TypeScript, Tailwind CSS, shadcn/ui et Framer Motion.
- `apps/api` : API NestJS avec Prisma et PostgreSQL.
- `packages/types` : contrats TypeScript partagés entre le frontend et l'API.
- `packages/ui` : emplacement des composants partagés propres à Savoraill.
- `packages/config` : configurations TypeScript communes.
- `compose.yaml` : PostgreSQL, MinIO, Adminer et Mailpit en local.
- `docs` : décisions d'architecture et conventions du projet.

## Démarrage futur

La structure est prête, mais les dépendances ne sont pas encore installées.

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
pnpm install
pnpm infra:up
pnpm dev:api
pnpm dev:web
```

## Services locaux

| Service | Adresse |
| --- | --- |
| Frontend | http://localhost:3000 |
| API | http://localhost:4000/api |
| PostgreSQL | localhost:5432 |
| MinIO API | http://localhost:9000 |
| MinIO Console | http://localhost:9001 |
| Adminer | http://localhost:8080 |
| Mailpit | http://localhost:8025 |
