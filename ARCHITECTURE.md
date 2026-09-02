# Architecture — Nova Cloud

Nova est une application web d’assistant IA conçue pour rester utilisable gratuitement. Elle démarre sans compte, sans carte bancaire et sans clé API grâce à un mode démo exécuté dans le navigateur.

## Principes

- Mode principal dégradé : chat de démonstration, création de fichiers HTML/CSS/JavaScript, prévisualisation isolée et export/import JSON.
- Architecture multi-fournisseurs : les connecteurs IA, voix et stockage sont séparés afin qu’un quota ou une panne ne bloque pas l’application.
- Aucun secret dans le frontend : toute clé éventuelle reste côté serveur, via variables d’environnement.
- Données récupérables : les conversations et projets restent exportables en JSON.
- Sécurité navigateur : partage d’écran uniquement via `getDisplayMedia`, avec autorisation du navigateur et arrêt contrôlé.

## Couches

- `src/providers/ModelProvider.js` : contrat pour la génération de réponse, avec repli vers le mode démo.
- `src/providers/SpeechProvider.js` : reconnaissance et synthèse vocales du navigateur.
- `src/providers/StorageProvider.js` : stockage local et export/import.
- `src/services/DemoService.js` : réponses et créations de démonstration sans API.
- `src/services/FileService.js` : aperçu des fichiers HTML dans une iframe isolée.
- `src/services/ScreenService.js` : partage d’écran explicite.
- `src/store/state.js` : conversations, projets et préférences.

## Évolution

Le backend FastAPI existant pourra accueillir des fournisseurs distants contrôlés par variables d’environnement. Chaque fournisseur devra déclarer son statut, son quota, sa date de vérification et son fournisseur de secours.
