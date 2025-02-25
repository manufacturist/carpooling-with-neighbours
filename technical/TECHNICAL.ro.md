[Back](./../README.md) | [Technical [EN]](./TECHNICAL.md)

## Procesul de dezvoltare

Clonează acest repo și însușește-ți-l. Nu există o soluție universală. Comunități diferite, nevoi diferite.

Deschide proiectul în editorul preferat și instalează pachetul (`npm install`). Astfel vei avea sugestii când codezi. Folosește [clasp](https://github.com/google/clasp)!

Dacă faci o schimbare care aduce un beneficiu comunității tale și consideri că i-ar putea ajuta și pe alții, nu ezita să deschizi un PR, dar ține cont de următoarele te rog:
1. UX-ul trebuie să rămână simplu și minimalist
2. Dacă este prea personalizat pentru comunitatea ta și nu i-ar ajuta pe alții, poate că o extensie ar fi mai utilă

Extensia ar fi un script independent și ar trebui să refolosească fișierele create, dar atenție, pentru că va necesita un domeniu de autorizare mai puternic, și anume `https://www.googleapis.com/auth/drive`. Cel mai probabil utilizatorii vor fi nevoiți să ia din proprietățile scriptului de față, id-urile pentru spreadsheet-uri, `USERS_SSID` & `RIDE_OFFERS_SSID`, și să le adauge în extensie.

Dacă vrei să faci o contribuție rapidă, poți adăuga suport pentru limba ta maternă dacă nu există deja (fișierul `src/contants.js`).

<br/>

## Domenii OAuth 2.0

Lista cu domeniile de autorizare Google necesare:
| Domeniul OAuth 2.0                     | Scop | Utilizare |
|----------------------------------------|---|---|
| `googleapis.com/auth/spreadsheets`     | Interacțiunea cu fișiere `Spreadsheet` | Crearea de fișiere tabelare: utilizatori și oferte de curse |
| `googleapis.com/auth/forms`            | Interacțiunea cu fișiere `Form` | Crearea formularului prin care se oferă o cursă |
| `googleapis.com/auth/drive.file`       | Creeare de fișiere noi și interacțiunea cu acestea | Opțiunea de dezinstalare (uninstall) |
| `googleapis.com/auth/userinfo.email`   | Vede adresa principală a contului tău de Google | Pentru ca destinatarii să poată răspundă la email-ul de duminică (pentru dezabonare) către adresa `EMAILUL_TĂU+carpooling@gmail.com` |
| `googleapis.com/auth/script.scriptapp` | Executare de cod în absența ta | Folosit pentru a trimite automat email-ul de duminică |
| `googleapis.com/auth/script.send_mail` | Trimitere de email în numele tău | Folosit pentru a putea trimite email-ul de duminică |
| `mail.google.com`                      | Acces la Gmail | Folosit pentru a verifica dacă pe adresa menționată anterior, au venit răspunsuri de dezabonare de la destinatari (doar pentru modul "auto" de dezabonare)  |

<br/>

## Provocări documentate

| Categorie | Provocare | Soluție |
|-----------|-----------|---------|
| Aplicație Web | Evitarea utilizării CDN-urilor și adăugărea de stiluri | O configurație bazică Tailwind. Există un singur punct de intrare în aplicația web prin funcția `doGet()`. S-ar putea argumenta că se putea multiplexa funcția de intrare pentru a servi conținut în funcție de un anumit parametru din endpoint, însă acest lucru părea puțin forțat. Am ajuns să încorporez CSS-ul generat în `index.template.html`, folosind notația `<?!= tailwind-css-here ?>`. Această notație deschide porțile unui vector de atac XSS, dar, deoarece controlăm CSS-ul generat, nu ar trebui să fie o problemă. |
|           | Urmărirea vizualizărilor paginii | Am folosit [Pirsch](https://pirsch.io) pentru acest lucru și un Cloudflare worker. Este GDPR-friendly și nu folosește cookie-uri. Scopul worker-ului este de a proteja împotriva exploziilor de încărcări de pagină care consumă din cota de vizualizări posibile. Funcționează folosind un limitator de tip sliding window rate și un mecanism de blocare a IP-urilor. Prea multe cereri de la același IP și boom, blocăm urmărirea vizualizărilor paginii pentru acel IP. În timpul configurării proiectului, se generează un ID al comunității, care este utilizat ca referrer atunci când apelăm Pirsch. Acest lucru ne lasă să segmentăm vizualizările paginii pe comunități. De asemenea, evităm astfel afișarea URL-ului intern al iframe-ului în dashboard-ul metricilor. |
|           | Componente | Se folosește o singură componentă pentru curse. Utilizează notația `<?= ?>` pentru a injecta text în siguranță în timpul randării. |
|           | Cache pentru pagina randată | Pagina randată este memorată în cache timp de 3 minute pentru a evita operațiunile de preluare a datelor și de randare. |
| DevX      | Cicluri de dezvoltare lente | Folosesc clasp și VSC pentru sugestii. Împing modificările cu `npm run update`. |
|           | Structura codului | Împărțirea codului în fișiere în funcție de scop. |
|           | Configurarea proiectului | Am încercat să reduc numărul de pași necesari pentru configurarea proiectului. În esență, trebuie doar să rulezi `main()` și să faci un deploy manual pentru aplicația web. |
| Email     | Email marcat ca spam | Evitarea emailurilor HTML; am folosit doar text simplu și un singur link. |
|           | Dezabonare | Se face prin răspuns cu `dezabonare` la orice email. Emailurile primite folosesc notația plus `your-email+carpooling@gmail.com`. Utilizatorul poate filtra aceste emailuri în inbox. |
| i18n      | Limbi multiple | Toate traducerile sunt definite în fișierul `constants.js`. |
