[![Licență: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

[:uk: English](./README.md) | [:romania: Română](./README.ro.md)

# Drumuri cu vecinii

O soluție cu zero costuri și interacțiune minimă pentru a face drumuri cu vecinii (carpooling), folosind Google Apps Script.

Este o soluție benefică pentru:
* Clădiri rezidențiale
* Birouri / companii mari
* Comunități unite

## Cuprins

* [Cum funcționează?](#cum-funcționează)
* [Beneficii](#beneficiil)
* [Instalare](#instalare)
* [Procesul de dezvoltare](#procesul-de-dezvoltare)
* [Întrebări frecvente](#întrebări-frecvente)
* [Inspirație](#inspirație)

<br/>

## Cum funcționează?

Un vecin poate oferi o cursă completând un formular. În fiecare duminică, un email este trimis în jurul orei 18:00 cu o listă de curse disponibile pentru săptămâna următoare tuturor celor interesați:

```
Bună Veta,

Aici sunt cursele disponibile pentru săptămâna viitoare:

🚗 Hotelul Vega (la Gogu a lui Pupăză) | miercuri, 20.08, 13:37
Șofer: Nea Mărin (Juvete, 0712345678)
Plecare: Băilești | Locuri: 3

Dacă o cursă ți se potrivește, contactează șoferul pentru a rezerva un loc.

Poți oferi și tu o cursă aici: https://forms.gle/ABCDEFGHIJKLMNOPQ

Dacă nu mai dorești să primești aceste actualizări, te poți dezabona de 
aici: https://rb.gy/123456?unsubscribe=00000000-0000-0000-0000-000000000000

Cu bine,
Echipa Drumuri cu Vecinii
```

Pentru a utiliza această soluție, cineva din comunitate / cartier trebuie să îndeplinească rolul de Admin. Adminul trebuie să adauge manual utilizatorii într-un fișier Google de tip "Sheet". Doar cei adăugați în fișierul respectiv pot primi email-ul de duminică și pot oferi curse prin formular.

Ai nevoie doar de adresele de email ale celor interesați.

💡 Pentru a avea mai mult succes cu această soluție, îți recomand să începi cu un grup mic de vecini. După ce o testați împreună și vedeți cum merge, puteți da anunțul în comunitate: "Salutare, suntem un grup de X vecini care am încercat [...]"

<br/>

## Beneficii

1. Costuri zero! Fără instalări de aplicații sau înregistrări de conturi (cu excepția șoferilor, dacă nu au cont de Google)

2. Funcționează cu până la 100 de vecini (email-ul de duminică)

3. Șoferii trebuie să aibă un cont de Google **verificat**, pentru a putea completa formularul

4. Există un aspect social. Trebuie să contactezi vecinul șofer direct pentru a rezerva un loc

5. Este o metodă simplă de a reduce poluarea și de a te conecta cu vecinii

:warning: 100 este limita de email-uri care pot fi trimise într-o zi pentru conturile gratuite, iar 1500 pentru conturile workspace

<br/>

## Instalare

Pentru a instala, vei avea nevoie de un cont Google. Descarcă codul și alege una dintre următoarele metode:
* Cel mai simplu mod este să copiezi proiectul din [Google Apps Script](https://script.google.com/home) în contul tău de Google
* Alternativ, dacă ești o persoană tehnică, poți folosi [clasp](https://github.com/google/clasp)

Acuma, pe pagina proiectului tău:

1. Apasă pe simbolul de setările proiectului '⚙️' din stânga paginii și alege fusul orar dorit

2. Tot în stânga paginii ai simbolul de editor `< >`. Apasă pe el și deschide fișierul `src/main.gs`

3. În fișierul acesta, va trebui să îți alegi limba dorită prin modificarea rândului 2, după care să salvezi modificarea (Click pe 💾 / Ctrl + S / CMD + S): <br/>
   `ro` - Română <br/>
   `en` - Engleză

4. Tot în acest fișier, ultimul pas este să rulăm funcția `main` prin apăsarea butonului `▷`. Aceasta va crea:
   * Fișierul de utilizatori (Sheet)
   * Formularul pentru a oferi o cursă (Form)
   * Fișierul cu ofertele de curse (Sheet), unde vor fi salvate răspunsurile formularului
   * Un trigger care setează numărul de telefon în fișierul de utilizatori, atunci când îl adaugă șoferul în formular
   * Un trigger care trimite un email utilizatorilor în fiecare duminică, cândva în fereastra 18:00 - 19:00

Asta e tot. Singura ta sarcină rămasă este să populezi manual lista de utilizatori. Pentru fiecare utilizator va trebui să introduci un email-ul și limba dorită de către acesta `[en, ro]`; opțional mai poți adăuga numele, numărul de telefon și o referință de identificare pentru șofer (apartament / birou).

Numele este util pentru a face email-ul mai personalizat și pentru a reduce șansa ca acesta să ajungă la spam. Numărul de telefon este necesar pentru șoferi, iar referința opțională îi ajută pe destinatarii email-ului să înțeleagă mai bine cine este șoferul.

Dacă ceva se strică, mult noroc <3 *"Țesutul digital fragil care ține această soluție laolaltă este rupt. Distruge-l și reconstruiește-l."* Salvează undeva datele din fișierul ce conține utilizatorii, și dezinstalează soluția. Va trebui să deschizi fișierul `src/uninstall.gs` și să rulezi (`▷`) funcția de `uninstall`. După care, reia de la pasul 2.

Domeniile de autorizare Google utilizate de către `Drumuri cu Vecinii`:
| Domeniul OAuth 2.0                                 | Scop | Utilizare |
|----------------------------------------------------|---|---|
| `https://www.googleapis.com/auth/spreadsheets`     | Interacțiunea cu fișiere `Spreadsheet` | Crearea de fișiere tabelare: utilizatori și oferte de curse |
| `https://www.googleapis.com/auth/forms`            | Interacțiunea cu fișiere `Form` | Crearea formularului prin care se oferă o cursă |
| `https://www.googleapis.com/auth/drive.file`       | Creeare de fișiere noi și interacțiunea cu acestea | Opțiunea de dezinstalare (uninstall) |
| `https://www.googleapis.com/auth/userinfo.email`   | Vede adresa principală a contului tău de Google | Pentru ca destinatarii să poată răspundă la email-ul de duminică (pentru dezabonare) către adresa `EMAILUL_TĂU+carpooling-unsubscribe@gmail.com` |
| `https://www.googleapis.com/auth/script.scriptapp` | Executare de cod în absența ta | Folosit pentru a trimite automat email-ul de duminică |
| `https://www.googleapis.com/auth/script.send_mail` | Trimitere de email în numele tău | Folosit pentru a putea trimite email-ul de duminică |
| `https://mail.google.com/`                         | Acces la Gmail | Folosit pentru a verifica dacă pe adresa menționată anterior, au venit răspunsuri de dezabonare de la destinatari (pentru modul "auto" de dezabonare)  |

<br/>

## Procesul de dezvoltare

Clonează acest repo și însușește-ți-l. Nu există o soluție universală. Comunități diferite, nevoi diferite.

Deschide proiectul în editorul preferat și instalează pachetul (`npm install`). Astfel vei avea sugestii când codezi. Folosește [clasp](https://github.com/google/clasp)!

Dacă faci o schimbare care aduce un beneficiu comunității tale și consideri că i-ar putea ajuta și pe alții, nu ezita să deschizi un PR, dar ține cont de următoarele:
1. UX-ul trebuie să rămână simplu și minimalist
2. Dacă este prea personalizat pentru comunitatea ta și nu i-ar ajuta pe alții, poate că o extensie ar fi mai utilă

Extensia ar trebui să refolosească fișierele create, dar atenție, pentru că va necesita un domeniu de autorizare mai puternic, și anume `https://www.googleapis.com/auth/drive`. Cel mai probabil utilizatorii vor fi nevoiți să ia din proprietățile scriptului de față, id-urile pentru spreadsheet-uri, `USERS_SSID` & `RIDE_OFFERS_SSID`, și să le adauge în extensie.

Dacă vrei să faci o contribuție rapidă, poți adăuga suport pentru limba ta maternă dacă nu există deja (fișierul `src/contants.js`).

<br/>

## Întrebări frecvente

* **De ce nu folosim un formular prin care utilizatorii se pot abona ușor la email-urile cu oferte de ride?** <br/>
  * Încercăm să limităm accesul la minimul necesar, la datele personale ale șoferilor

* **De ce nu folosim un formular pentru a rezerva curse?** <br/>
  * Vrem să încurajăm interacțiunea socială directă între șofer și pasagerul potențial, nu să o limităm
  * Dacă se folosește un formular, șoferul ar putea fi nevoit să inițieze un refuz dacă se simte inconfortabil cu pasagerul. Contactul direct permite șoferului să evalueze și să răspundă în condițiile lui, făcând procesul mai personal și mai atent
  * Complică UX-ul și codul

* **Ce părere ai despre a avea formulare în mai multe limbi pentru șoferi?**
  * Înca nu s-a ivit nevoia aceasta
  * Complica codul (un sheet per formular)

<br/>

## Inspirație

Provocarea a fost "Cum pot crea o soluție de carpooling care să funcționeze pentru orice comunitate cu un efort minim și costuri zero?" Am creat această soluție după ce un vecin m-a dus cu mașina la serviciu (mulțumesc, Roli!). Sper să te inspire să cauți simplitatea. Simplu este greu.

Dacă vrei să afli mai multe despre mine sau să-mi susții munca, poți vizita pagina mea de [GitHub](https://github.com/sponsors/manufacturist).
