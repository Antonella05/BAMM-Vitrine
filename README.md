# BAMM — site vitrine

Site statique (HTML + CSS + un peu de JavaScript, sans build), déployé sur Vercel : <https://bammvitrine.vercel.app>.
Code de l'application, de l'API et du notebook : <https://github.com/BAMM-Project/BAMM>.

```
index.html  probleme.html  solution.html  demo.html  ia.html  business.html  equipe.html  telecharger.html
assets/style.css     styles communs
assets/site.js       en-tête, pied de page, animations, infos de l'APK (version, taille, SHA-256)
assets/img/          figure SHAP issue du notebook
downloads/           APK Android téléchargeable
vercel.json          en-têtes de téléchargement de l'APK
```

Aperçu local : `python -m http.server 8000` puis <http://localhost:8000>.

## Publier une nouvelle version de l'APK
1. Dans le dépôt BAMM : `cd android && gradlew assembleRelease`.
2. Copier `app/build/outputs/apk/release/app-release.apk` vers `downloads/BAMM-<version>.apk`.
3. Mettre à jour l'objet `APK` en haut de `assets/site.js` (url, version, taille, sha256) et le lien de `telecharger.html`.
