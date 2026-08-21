# Conventions

- Les noms de fichiers TypeScript utilisent `kebab-case`.
- Les composants React utilisent des exports nommés, sauf les fichiers imposés par Next.js.
- Les variables d'environnement sont documentées dans `.env.example` et validées au démarrage.
- Les entrées HTTP sont validées dans l'API; les types TypeScript seuls ne constituent pas une validation.
- Les migrations Prisma sont versionnées avec le code.
- Aucun secret ni fichier `.env` réel ne doit être commité.
- Les images sont référencées par leur clé d'objet MinIO, jamais par un chemin absolu local.
