# Déploiement du backend Nova Cloud

## Sécurité

- Ne mets jamais `GROQ_API_KEY` dans GitHub, GitHub Pages, un fichier JavaScript ou une discussion.
- Ajoute la clé uniquement dans les variables chiffrées du service Render.
- Si une clé a été exposée, révoque-la dans Groq et crée-en une autre avant le déploiement.

## Déployer sur Render

1. Connecte-toi à Render avec GitHub.
2. Clique sur **New +**, puis **Blueprint**.
3. Sélectionne le dépôt `jarvis-assistant` et la branche `nova-cloud-rebuild`.
4. Render lit le fichier `render.yaml` et propose le service `nova-cloud-api`.
5. Crée le Blueprint puis attends la fin du premier déploiement.
6. Ouvre `nova-cloud-api` → **Environment**.
7. Ajoute la variable secrète `GROQ_API_KEY` avec ta nouvelle clé Groq privée.
8. Vérifie que `CORS_ORIGINS` vaut `https://spiderpaj1209-web.github.io`.
9. Clique sur **Save, rebuild, and deploy**.
10. Quand le statut devient Live, copie l’URL HTTPS publique du service.

## Vérifier

Ouvre `https://TON-URL/api/health`.

La réponse doit contenir :

```json
{"ok": true, "cloudConfigured": true, "provider": "groq"}
```

## Dernière étape

Envoie uniquement l’URL Render du backend à Nova. L’URL est publique, mais ta clé reste dans Render. Nova pourra alors appeler le backend cloud ; en cas de quota ou d’erreur, elle repassera sur Ollama local puis le mode démo.

## Limites

Groq et Render peuvent modifier leurs quotas ou leurs conditions. Cette configuration ne promet pas une IA cloud gratuite ou illimitée.
