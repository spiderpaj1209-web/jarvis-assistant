# Jarvis Desktop V2

Le bouton Mise a jour utilise le plugin updater Tauri et les GitHub Releases. Ne committe jamais ta clé privée.

Secrets GitHub Actions a créer dans Settings > Secrets and variables > Actions:
- TAURI_SIGNING_PRIVATE_KEY : contenu de `%USERPROFILE%\\.tauri\\jarvis.key`
- TAURI_SIGNING_PRIVATE_KEY_PASSWORD : mot de passe choisi lors de la génération

La clé publique doit remplacer `__JARVIS_PUBLIC_KEY__` dans `src-tauri/tauri.conf.json`.

Pour publier une version:
```bat
git add .
git commit -m "release"
git tag v0.2.1
git push origin main --tags
```
Le workflow compile les installeurs et publie la release. Les utilisateurs pourront ensuite cliquer sur Mise a jour.
