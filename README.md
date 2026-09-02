# Jarvis Assistant

Assistant IA personnel : chat texte + micro, memoire persistante, generation de code/jeux testables en direct, presentations PowerPoint affichables sans telechargement, et generation d'images.

## Ce que ca fait

- Chat texte et voix : parle au micro (reconnaissance vocale du navigateur, gratuit) ou ecris.
- Memoire persistante : chaque conversation est stockee en base de donnees. Jarvis retient les faits importants que tu lui donnes et les reutilise dans les reponses suivantes.
- Code/jeux testables : demande 'code-moi un jeu Snake', un bouton Tester ouvre le jeu jouable directement dans une fenetre, sans rien telecharger.
- Presentations : demande 'fais-moi un expose sur X', un bouton Afficher montre les slides directement dans le navigateur (bouton Export PowerPoint dispo aussi si tu veux le fichier).
- Images : demande une image, elle s'affiche directement dans la conversation.

## Limites honnetes de cette V1

- Pas de controle de ton PC ni de vision d'ecran en continu (demanderait un agent installe localement, donc un PC allume en permanence).
- Sur le plan gratuit de Render, le service s'endort apres 15 minutes d'inactivite et prend quelques secondes a se reveiller au prochain message.
- Avec SQLite (par defaut), la memoire est reinitialisee a chaque redeploiement. Pour une memoire qui survit vraiment a tout, connecte une base Postgres gratuite (voir plus bas).

## Deploiement (gratuit, ~10 minutes)

1. Cle Groq (le cerveau, gratuit) : cree un compte sur https://console.groq.com et recupere une cle API.
2. Base de donnees persistante (recommande) : cree un compte gratuit sur https://neon.tech, cree un projet, copie l'URL de connexion Postgres (commence par postgresql://...).
3. Deploiement sur Render :
   - Va sur https://render.com, connecte ton compte GitHub
   - 'New +' -> 'Web Service' -> choisis le depot jarvis-assistant
   - Render detecte render.yaml automatiquement
   - Dans les variables d'environnement, ajoute :
     - GROQ_API_KEY = ta cle Groq
     - DATABASE_URL = l'URL Neon (sinon SQLite sera utilise par defaut, memoire non permanente)
   - Clique 'Create Web Service'
4. Attends la fin du build (2-3 minutes), une URL publique est generee automatiquement.

Chaque fois qu'un nouveau code est pousse sur la branche main de ce depot, Render redeploie automatiquement - aucune action manuelle necessaire.
