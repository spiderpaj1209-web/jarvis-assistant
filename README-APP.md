# Jarvis Desktop V2

Application Tauri avec interface 3D, conversation texte/micro, bouton Tester et bouton Mise a jour.

## Developpement

```bash
npm install
npm run tauri:dev
```

## Release

1. Ajouter les icones dans `src-tauri/icons/`.
2. Creer un tag GitHub, par exemple `v0.2.0`.
3. GitHub Actions compile les installeurs.
4. Publier la release.

Le bouton de mise a jour est prepare pour etre relie au updater Tauri signe dans une prochaine etape. Aucun secret ne doit etre place dans Git.
