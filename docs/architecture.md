# Architecture technique

## Principes

1. Le frontend ne communique jamais directement avec PostgreSQL ou MinIO.
2. L'API NestJS centralise les règles métier, l'authentification et l'accès aux données.
3. PostgreSQL conserve les données métier et les métadonnées des images.
4. MinIO conserve les fichiers binaires et expose une API compatible S3.
5. Les contrats réellement partagés vivent dans `packages/types`; le code métier reste dans son application propriétaire.

## Flux principal

```text
Navigateur -> Next.js -> API NestJS -> PostgreSQL
                              |
                              +-------> MinIO
                              |
                              +-------> Mailpit
```

## Organisation par domaine

Les fonctionnalités de l'API seront ajoutées dans `apps/api/src/modules`, par exemple :

```text
modules/
  auth/
  menu/
  media/
  orders/
  reservations/
  restaurant/
```

Le frontend suivra la même logique dans `apps/web/src/features` afin de garder les composants, hooks et appels API proches de leur domaine.
