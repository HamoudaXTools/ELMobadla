# إصلاح نشر الموقع على GitHub Pages

## محتويات الإصلاح
- ملف النشر: `.github/workflows/pages.yml`
- ينشر الموقع الثابت من الملفات `index.html` و`style.css` و`script.js` و`favicon.svg` ومجلد `assets`.
- يستخدم `actions/upload-pages-artifact@v3` و`actions/deploy-pages@v4`.
- يضبط صلاحيات Pages وOIDC المطلوبة، ويمنع تشغيل عمليتي نشر متعارضتين في نفس الوقت.

## خطوات التركيب المهمة
1. فك ضغط المشروع.
2. ارفع محتويات المجلد إلى جذر مستودع `HamoudaXTools/ELMobadla` على فرع `main`، مع مجلد `.github` وملف `GITHUB_PAGES_SETUP_AR.md`.
3. من GitHub افتح Settings ثم Pages.
4. اجعل Source = GitHub Actions.
5. من Actions عطّل أي Workflow قديم آخر ينشر إلى GitHub Pages حتى لا يتنافس مع `pages.yml`.
6. افتح Actions وشغّل `Deploy static website to GitHub Pages` من زر Run workflow، أو ادفع commit جديدًا إلى `main`.

## إذا استمر updating_pages
إذا فشل Workflow الجديد أيضًا في `Deploy to GitHub Pages` مع بقاء الحالة `updating_pages`، فالمشكلة غالبًا في خدمة Pages أو حالة نشر عالقة على GitHub وليست في ملفات HTML/CSS/JS. انتظر قليلًا ثم أعد تشغيل Workflow مرة واحدة، وافحص GitHub Status إذا تكرر العطل.
