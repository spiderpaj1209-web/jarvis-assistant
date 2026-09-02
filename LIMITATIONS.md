# Limitations et gratuité

## Routage hybride réel

Le mode Automatique suit cet ordre : Cloud configuré, Ollama local, puis démo. Nova affiche la source effective sur chaque réponse : `Cloud`, `Local — Ollama` ou `Démo locale`.

## Cloud

Un fournisseur cloud n’est pas activé dans le frontend : GitHub Pages ne peut pas protéger une clé. Un backend HTTPS séparé devra être configuré avant d’activer `CloudProvider`. Les quotas et conditions sont variables et ne sont jamais présentés comme illimités.

## Local

Le secours local exige Ollama lancé sur `http://localhost:11434` et au moins un modèle téléchargé. Nova n’envoie alors aucune requête à une API cloud.

## Écran et images

Le navigateur demande toujours une autorisation explicite avant tout partage d’écran. Les captures ne sont pas envoyées automatiquement : une future analyse d’écran devra afficher clairement la destination (cloud ou local) et demander l’action de l’utilisateur.

## Données

Les conversations sont stockées dans le navigateur et restent exportables/importables en JSON. L’effacement des données du navigateur peut les supprimer : l’export est la sauvegarde récupérable.
