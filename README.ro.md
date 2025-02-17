[![Licență: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

[English](./README.md) | [Română](./README.ro.md)

# Drumuri cu Vecinii

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

Dacă nu mai dorești să primești aceste actualizări, spune-ne răspunzând 
la acest email și te vom dezabona manual.

Cu bine,
Echipa Drumuri cu Vecinii
```

Pentru a utiliza această soluție, cineva din comunitate / cartier trebuie să îndeplinească rolul de Admin. Adminul trebuie să adauge manual utilizatorii într-un fișier Google de tip "Sheet". Doar cei adăugați în fișierul respectiv pot primi email-ul de duminică sau pot oferi curse prin formular.

Ai nevoie doar de adresele de email ale celor interesați.

💡 Pentru a avea mai mult succes cu această soluție, îți recomand să începi cu un grup mic de vecini. După ce o testați împreună și vedeți cum merge, puteți da anunțul în comunitate: `Salutare, suntem un grup de X vecini care am încercat [...]`

<br/>

## Beneficii

1. Costuri zero! Fără instalări de aplicații sau înregistrări de conturi (cu excepția șoferilor<sup>(1)</sup>)

2. Funcționează cu până la 100<sup>(2)</sup> de vecini (email-ul de duminică)

3. Este un mod simplu de socializa cu vecinii tăi și de a reduce traficul din zona ta

<br/>

<sup>(1)</sup> Șoferii trebuie să aibă un cont Google verificat pentru a oferi curse prin formular

<sup>(2)</sup> 100 este cota zilnică de e-mailuri pentru conturile gratuite și 1500 pentru cele Workspace

<br/>

## Instalare

Pentru început, va trebui să decizi dacă vrei să folosești un cont personal de Google sau un cont terț. De știut că se vor trimite email-uri cu adresa ta de email, folosind adresare cu plus (`EMAILUL_TĂU+carpooling@gmail.com`). 

Pentru a instala:
* Cel mai simplu mod este să copiezi proiectul public din [Google Apps Script](https://script.google.com/home), în contul tău
* Alternativ, dacă ești o persoană tehnică, poți folosi [clasp](https://github.com/google/clasp) pe proiectul descărcat

Acuma, pe pagina proiectului tău:

1. Apasă pe simbolul pentru setările proiectului '⚙️' din stânga paginii și alege fusul orar dorit. România este pe GMT+2 (Europe/Bucharest)

2. Tot în stânga paginii ai simbolul pentru editor `< >`. Apasă pe el și deschide fișierul `src/main.gs`

3. În fișierul acesta, va trebui să îți alegi limba dorită (cea vorbita de majoritatea destinatarilor) prin modificarea rândului 2, iar apoi salvează modificarea prin click pe 💾, sau Ctrl + S sau CMD + S. Variante posibile: <br/>
   `ro` - Română <br/>
   `en` - Engleză

4. Tot în acest fișier, trebuie să rulăm funcția `main` prin apăsarea butonului `▷`. Aceasta va crea:
   * Fișierul de utilizatori (Sheet)
   * Formularul pentru a oferi o cursă (Form)
   * Fișierul cu ofertele de curse (Sheet), unde vor fi salvate răspunsurile formularului
   * Un trigger care setează numărul de telefon în fișierul de utilizatori, atunci când îl adaugă șoferul în formular
   * Un trigger care trimite un email destinatarilor în fiecare duminică, cândva în fereastra 18:00 - 19:00

5. Modul de dezabonarea utilizat este cel `manual`. Dacă vrei ca vecinii tăi să se poată dezabona automat, răspunzând cu 'dezabonare' la email-ul primit, atunci:
   * În setările proiectului (⚙️), dute în josul paginii, și apasă pe butonul de editare a proprietăților script-ului
   * Modifică proprietatea UNSUBSCRIBE_MODE, din `manual` în `auto` și salvează
   * Deschide fișierul `src/unsubscribe.js` și rulează funcția `activateAutomaticEmailUnsubscribeTrigger`
   * Aceasta va activa o verificare automată (odată la 30 de minute), care caută email-uri de dezabonare și șterge abonații din lista de utilizatori

Asta e tot. Singura ta sarcină rămasă este să populezi manual lista de utilizatori. Pentru fiecare vecin interesat va trebui să introduci email-ul său și limba dorită de către acesta `[en, ro]`; opțional mai poți adăuga numele, numărul de telefon și o referință de identificare pentru șofer (apartament / birou).

Numele este util pentru a face email-ul mai personalizat și pentru a reduce șansa ca acesta să ajungă la spam. Numărul de telefon este necesar pentru șoferi, iar referința opțională îi ajută pe destinatarii email-ului să înțeleagă mai bine cine este șoferul.

Dacă ceva se strică, mult noroc <3 *"Țesutul digital fragil care ține această soluție laolaltă este rupt. Distruge-l și reconstruiește-l."* Salvează undeva datele din fișierul ce conține utilizatorii, și dezinstalează soluția. Va trebui să deschizi fișierul `src/uninstall.gs` și să rulezi (`▷`) funcția de `uninstall`. După care, reia procesul de instalare începând cu pasul 2.

Domeniile de autorizare Google utilizate de către `Drumuri cu Vecinii`:
| Domeniul OAuth 2.0                                 | Scop | Utilizare |
|----------------------------------------------------|---|---|
| `https://www.googleapis.com/auth/spreadsheets`     | Interacțiunea cu fișiere `Spreadsheet` | Crearea de fișiere tabelare: utilizatori și oferte de curse |
| `https://www.googleapis.com/auth/forms`            | Interacțiunea cu fișiere `Form` | Crearea formularului prin care se oferă o cursă |
| `https://www.googleapis.com/auth/drive.file`       | Creeare de fișiere noi și interacțiunea cu acestea | Opțiunea de dezinstalare (uninstall) |
| `https://www.googleapis.com/auth/userinfo.email`   | Vede adresa principală a contului tău de Google | Pentru ca destinatarii să poată răspundă la email-ul de duminică (pentru dezabonare) către adresa `EMAILUL_TĂU+carpooling-unsubscribe@gmail.com` |
| `https://www.googleapis.com/auth/script.scriptapp` | Executare de cod în absența ta | Folosit pentru a trimite automat email-ul de duminică |
| `https://www.googleapis.com/auth/script.send_mail` | Trimitere de email în numele tău | Folosit pentru a putea trimite email-ul de duminică |
| `https://mail.google.com/`                         | Acces la Gmail | Folosit pentru a verifica dacă pe adresa menționată anterior, au venit răspunsuri de dezabonare de la destinatari (doar pentru modul "auto" de dezabonare)  |

<br/>

## Procesul de dezvoltare

Clonează acest repo și însușește-ți-l. Nu există o soluție universală. Comunități diferite, nevoi diferite.

Deschide proiectul în editorul preferat și instalează pachetul (`npm install`). Astfel vei avea sugestii când codezi. Folosește [clasp](https://github.com/google/clasp)!

Dacă faci o schimbare care aduce un beneficiu comunității tale și consideri că i-ar putea ajuta și pe alții, nu ezita să deschizi un PR, dar ține cont de următoarele te rog:
1. UX-ul trebuie să rămână simplu și minimalist
2. Dacă este prea personalizat pentru comunitatea ta și nu i-ar ajuta pe alții, poate că o extensie ar fi mai utilă

Extensia ar fi un script independent și ar trebui să refolosească fișierele create, dar atenție, pentru că va necesita un domeniu de autorizare mai puternic, și anume `https://www.googleapis.com/auth/drive`. Cel mai probabil utilizatorii vor fi nevoiți să ia din proprietățile scriptului de față, id-urile pentru spreadsheet-uri, `USERS_SSID` & `RIDE_OFFERS_SSID`, și să le adauge în extensie.

Dacă vrei să faci o contribuție rapidă, poți adăuga suport pentru limba ta maternă dacă nu există deja (fișierul `src/contants.js`).

<br/>

## Întrebări frecvente

* **De ce nu folosim un formular prin care vecinul se poate abona ușor la email-urile de informare?** <br/>
  * Verificăm fiecare utilizator individual deoarece gestionăm date personale. Accesul trebuie limitat doar celor care fac parte din comunitate

* **De ce nu folosim un formular pentru rezervarea curselor?** <br/>
  * Vrem să încurajăm interacțiunea socială directă între șofer și pasagerul potențial, nu să o limităm
  * Dacă se folosește un formular, șoferul ar putea fi nevoit să inițieze un refuz dacă se simte inconfortabil cu pasagerul, dar dacă vecinul stabilește contactul direct, asta îi permite șoferului să evalueze, să pună întrebări și să răspundă în felul său, făcând procesul mai personal și mai respectuos
  * Complică UX-ul și codul

* **Ce părere ai despre a avea formulare în mai multe limbi pentru șoferi?**
  * Înca nu s-a ivit nevoia aceasta
  * Complica codul (un sheet per formular)

<br/>

## Inspirație

Provocarea a fost "Cum pot crea o soluție de carpooling care să funcționeze pentru orice comunitate cu un efort minim și costuri zero?". Am creat această soluție după ce un vecin m-a dus cu mașina la serviciu (mulțumesc, Roli!). Sper să te inspire să cauți simplitatea. Simplu este greu.

Dacă vrei să afli mai multe despre mine sau să-mi susții munca, poți vizita pagina mea de [GitHub](https://github.com/sponsors/manufacturist).
