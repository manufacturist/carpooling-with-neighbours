[![Licență: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

[English](./README.md) | [Română](./README.ro.md)

# 🚘 Drumuri cu Vecinii

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

Un vecin poate oferi o cursă completând un formular. În fiecare duminică, un email este trimis în jurul orei 18:00 cu o listă de curse disponibile pentru săptămâna următoare tuturor celor interesați. Vecinii pot verifica oricând cursele valabile pe o pagină web.

```
Bună Veta,

Aici sunt cursele disponibile pentru săptămâna viitoare:

🚘 Hotelul Vega (la Gogu a lui Pupăză) | Miercuri, 20.08, 13:37
Șofer: Nea Mărin (Juvete, 0712345678)
Plecare: Băilești | Locuri: 3

🚘 Duc polistirenul la colectat | Sâmbătă, 23.08, 12:00 AM
Șofer: Dorel (ap. 42, 0712345678)
Plecare: În fața blocului | Locuri: 4

Dacă o cursă ți se potrivește, contactează șoferul pentru a rezerva un loc.

Poți oferi și tu o cursă aici: https://forms.gle/ABCDEFGHIJKLMNOPQ

Dacă nu mai dorești să primești aceste actualizări, spune-ne răspunzând 
la acest email și te vom dezabona manual.

Cu bine,
Echipa Drumuri cu Vecinii
```

Pentru a utiliza această soluție, cineva din comunitate / cartier trebuie să îndeplinească rolul de Admin. Adminul trebuie să adauge manual utilizatorii într-un fișier Google de tip "Sheet". Doar cei adăugați în fișierul respectiv pot primi email-ul de duminică sau pot oferi curse prin formular.

💡 Dacă nu dorești să folosești emailul de duminică, poți să adaugi doar șoferii în fișierul de utilizatori

💡 Pentru a avea mai mult succes cu această soluție, îți recomand să începi cu un grup mic de vecini. După ce o testați împreună și vedeți cum merge, puteți da anunțul în comunitate: `Salutare, suntem un grup de X vecini care am încercat [...]`

<br/>

## Beneficii

1. Costuri zero! Fără instalări de aplicații sau înregistrări de conturi (cu excepția șoferilor<sup>(1)</sup>)

2. Funcționează cu orice număr de vecini<sup>(2)</sup>

3. Este un mod simplu de socializa cu vecinii tăi și de a reduce traficul din zona ta

<br/>

<sup>(1)</sup> Șoferii trebuie să aibă un cont Google verificat pentru a oferi curse prin formular

<sup>(2)</sup> Emailul de duminică. 100 este cota zilnică de e-mailuri pentru conturile gratuite și 1500 pentru cele Workspace

<br/>

## Instalare

Pentru început, va trebui să decizi dacă vrei să folosești un cont personal de Google sau un cont secundar. De știut că se vor trimite email-uri cu adresa de email aleasă, utilizând adresare cu plus (`emailul-tău+carpooling@gmail.com`).

Pentru a instala:
* Cel mai simplu mod este să copiezi proiectul public din [Google Apps Script](https://script.google.com/home), în contul tău
* Alternativ, dacă ești o persoană tehnică, poți folosi [clasp](https://github.com/google/clasp) pe proiectul descărcat

Acuma, pe pagina proiectului tău:

1. Apasă pe simbolul pentru setările proiectului ⚙️ din stânga paginii și alege fusul orar dorit. România este pe GMT+2 (Europe/Bucharest)

2. Tot în stânga paginii ai simbolul pentru editor `< >`. Apasă pe el și deschide fișierul `src/_main.gs`

3. În fișierul acesta, va trebui să îți alegi limba dorită prin modificarea rândului 2, iar apoi salvează modificarea prin click pe 💾, sau Ctrl + S sau CMD + S. Variante posibile: <br/>
   `ro` - Română <br/>
   `en` - Engleză

4. Tot în acest fișier, trebuie să rulăm funcția `main` prin apăsarea butonului ▷. Aceasta va crea:
   * Fișierul de utilizatori (Sheet)
   * Formularul pentru a oferi o cursă (Form)
   * Fișierul cu ofertele de curse (Sheet), unde vor fi salvate răspunsurile formularului
   * Un trigger care setează numărul de telefon în fișierul de utilizatori, atunci când îl adaugă șoferul în formular
   * Un trigger care trimite un email destinatarilor în fiecare duminică, cândva în fereastra 18:00 - 19:00

5. Acuma apasă pe butonul mare și albastru de `Deploy` și alege opțiunea de `New deployment`. În fereastra nou deschisă, apasă pe `Deploy`. Acuma, vei vedea link-ul `Web App URL` care poate fi accesat pentru a vedea drumurile valabile oferite de câtre vecini. Dacă îți este accesibil, instalarea este completă

Pasul următor este opțional:

6. Modul de dezabonarea utilizat este cel `manual`. Dacă vrei ca vecinii tăi să se poată dezabona automat, răspunzând cu 'dezabonare' la email-ul primit, atunci:
   * În setările proiectului (⚙️), dute în josul paginii, și apasă pe butonul de editare a proprietăților script-ului
   * Modifică proprietatea UNSUBSCRIBE_MODE, din `manual` în `auto` și salvează
   * Deschide fișierul `src/unsubscribe.js` și rulează funcția `activateAutomaticEmailUnsubscribeTrigger`
   * Aceasta va activa o verificare automată (odată la 30 de minute), care caută email-uri de dezabonare și șterge abonații din lista de utilizatori

Singura ta sarcină rămasă este să populezi manual lista de utilizatori. Pentru fiecare vecin interesat va trebui să introduci email-ul său și limba dorită de către acesta `[en, ro]`, precum și `1` în coloana de notificare dacă vrea să primească emailul de duminică; altfel, lasă coloana goală opțional mai poți adăuga numele, numărul de telefon și o referință de identificare pentru șofer (apartament / birou). Asta e tot.

Numele este util pentru a face email-ul mai personalizat și pentru a reduce șansa ca acesta să ajungă la spam. Numărul de telefon este necesar pentru șoferi, iar referința opțională îi ajută pe destinatarii email-ului să înțeleagă mai bine cine este șoferul.

Dacă ceva se strică, mult noroc <3 *"Țesutul digital fragil care ține această soluție laolaltă este rupt. Distruge-l și reconstruiește-l."* Salvează datele din fișierul ce conține utilizatorii și dezinstalează soluția. Va trebui să deschizi fișierul `src/uninstall.gs` și să rulezi `▷` funcția de `uninstall`. După care, reia procesul de instalare începând cu pasul 2.

<br/>

## Procesul de dezvoltare

Toate detaliile tehnice pot fi găsite [aici [RO]](./docs/TECHNICAL.ro.md) sau [aici [EN]](./docs/TECHNICAL.md).

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

Provocarea a fost *"Cum pot crea o soluție de carpooling care să funcționeze pentru orice comunitate cu un efort minim și costuri zero?"*. Am creat această soluție după ce un vecin m-a dus cu mașina la serviciu (mulțumesc, Roli!). Sper să te inspire să cauți simplitatea. Simplu este greu.

Dacă vrei să afli mai multe despre mine sau să-mi susții munca, poți vizita pagina mea de [GitHub](https://github.com/sponsors/manufacturist).
