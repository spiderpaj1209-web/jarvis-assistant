# Limitations et gratuité

## Vérité sur la gratuité

Aucun fournisseur externe n’est présenté comme « gratuit à vie ». Les conditions, quotas et exigences de carte bancaire peuvent changer. Nova doit donc rester utilisable sans fournisseur externe.

## Mode disponible sans clé

- Discussion de démonstration.
- Création de pages HTML/CSS/JavaScript et d’un mini-jeu web simple.
- Prévisualisation locale dans une iframe sandboxée.
- Stockage local du navigateur.
- Export et import JSON.
- Partage d’écran uniquement après l’autorisation explicite de l’utilisateur.

## Limites connues

- Le mode démo ne remplace pas un vrai modèle de langage : les réponses sont limitées et déterministes.
- Le stockage navigateur dépend du quota de chaque navigateur. L’export JSON est la sauvegarde récupérable.
- Les APIs vocales du navigateur dépendent du navigateur, du système et des permissions.
- Un site web ne peut pas contrôler clavier, souris ou fichiers système librement. Ces fonctions exigeraient une application desktop ou un agent local explicite.
- Le code généré s’exécute uniquement dans une iframe isolée. Aucun script système n’est exécuté.

## Règles si un fournisseur est ajouté

- Vérifier le plan gratuit, les quotas, la carte bancaire et la date de vérification avant activation.
- Afficher fournisseur actif, quota connu et repli actif.
- En cas d’échec ou de quota atteint, revenir au mode démo sans supprimer les données.
- Ne jamais intégrer une clé API au frontend ni dans Git.
