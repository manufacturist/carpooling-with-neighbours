[![Licență: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

[:uk: English](./README.md) | [:romania: Română](./README.ro.md)

# Drumuri cu vecinii

O soluție cu zero costuri și interacțiune minimă pentru a face drumuri cu vecinii (carpooling), folosind Google Apps Script.

Este o soluție benefică pentru:
* Clădiri rezidențiale
* Birouri / companii mari
* Comunități închegate

<br/>

## Cuprins

* [Cum funcționează?](#cum-funcționează)
* [Beneficii](#beneficiil)
* [Configurare](#configurare)
* [Procesul de dezvoltare](#procesul-de-dezvoltare)
* [Idei abandonate](#idei-abandonate)
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

Pentru a utiliza această soluție, cineva din comunitate / cartier trebuie să îndeplinească rolul de Admin. Adminul trebuie să adauge manual utilizatorii într-un fișier Google de tip "Sheet". Doar cei adăugați în fișierul respectiv pot primi emailul de duminică și pot oferi curse prin formular.

Ai nevoie doar de adresele de email ale celor interesați.

💡 Pentru a avea mai mult succes cu această soluție, îți recomand să începi cu un grup mic de vecini. După ce o testați împreună și vedeți cum merge, puteți da anunțul în comunitate: "Salutare, suntem un grup de X vecini care am încercat [...]"

<br/>

## Beneficii

1. Costuri zero! Fără instalări de aplicații sau înregistrări de conturi (cu excepția șoferilor, dacă nu au cont de Google)

2. Funcționează cu până la 100 de vecini (emailul de duminică)

3. Șoferii trebuie să aibă un cont de Google **verificat**. Un email verificat este necesar la completarea formularului

4. Există un aspect social. Trebuie să contactezi direct vecinul șofer pentru a rezerva un loc

5. Este o metodă simplă de a reduce poluarea și de a te conecta cu vecinii

:warning: 100 este limita de email-uri care pot fi trimise într-o zi, pentru conturile gratuite. 1500 pentru conturile workspace

<br/>

## Configurare

Pentru a instala, vei avea nevoie de un cont Google. Descarcă codul și alege una dintre următoarele metode:
* Dacă ești o persoană tehnică, îți recomand să folosești [clasp](https://github.com/google/clasp)
* Dacă nu, mergi la [Google Apps Script](https://script.google.com/home), creează un proiect nou și adaugă folderul `src` și `template` la proiectul nou creat, după ce descarci codul local

Pe pagina proiectului, mergi la editor și deschide fișierul `main.gs`. Setează fusul orar local (modificare de cod), iar apoi rulează funcția `main()`. Aceasta crează următoarele:
1. Fișierul `Users` (Sheet)
2. Formularul `Offer Ride` (Form)
3. Fișierul `Ride Offers` (Sheet), unde vor fi salvate răspunsurile formularului
4. Un trigger care setează numărul de telefon în `Users` atunci când îl adaugă șoferul
5. Un trigger care trimite un email utilizatorilor în fiecare duminică, în jurul orei 18:00

Asta e tot. Singura ta sarcină rămasă este să populezi manual lista de utilizatori. Pentru fiecare utilizator va trebui să introduci un identificator aleator [UUID](https://www.uuidgenerator.net/), emailul, și limba dorită de către acesta `[en, ro]`; opțional mai poți adăuga numele, numărul de telefon și o referință pentru șofer (apartament / birou).

Identificatorul va fi folosit pentru dezabonarea utilizatorului. Numele este util pentru a face emailul mai personalizat și pentru a reduce șansa ca acesta să ajungă la spam. Numărul de telefon este necesar pentru șoferi, iar referința îi ajută pe destinatarii emailului să înțeleagă mai bine cine este șoferul.

Dacă ceva se strică, mult noroc <3 *"Țesutul digital fragil care ține această soluție laolaltă este rupt. Distruge-l și reconstruiește-l."* 

<br/>

## Procesul de dezvoltare

Clonează acest repo și însușește-ți-l. Nu există o soluție universală. Comunități diferite, nevoi diferite.

Deschide proiectul în VSC și instalează pachetele (`npm install`). Astfel vei avea sugestii când codezi și nu o vei lua razna. Folosește [clasp](https://github.com/google/clasp)!

Dacă faci o schimbare care aduce un beneficiu comunității tale și consideri că i-ar putea ajuta și pe alții, nu ezita să deschizi un PR. Dar ține cont de următoarele:
1. UX-ul trebuie să rămână simplu și minimalist
2. Dacă este prea personalizat pentru comunitatea ta și nu i-ar ajuta pe alții, nu te deranja :shrug:

Dacă vrei să faci o contribuție rapidă, poți adăuga suport pentru limba ta maternă dacă nu este deja prezentă (`contants.js`).

<br/>

## Idei abandonate

1. **Un formular pentru rezervarea unei curse**
   * Complică UX-ul și codul
   * Vrem să promovăm interacțiunea socială, nu să o limităm
   * Ce faci dacă șoferul nu cunoaște sau nu îi place persoana care a rezervat un loc?

2. **Formulare i18n pentru șoferi (formulare multiple)**
   * Complică codul
   * Engleza este baza

<br/>

## Întrebări frecvente

* **De ce nu adaugi un formular astfel încât utilizatorii să dea subscribe la emailul de curse disponibile?** <br/>
   Zero încredere în utilizatori. Întotdeauna. Evaluează-i unul câte unul.

<br/>

## Inspirație

Provocarea a fost "Cum pot crea o soluție de carpooling care să funcționeze pentru orice comunitate cu un efort minim și costuri zero?" Am creat această soluție după ce un vecin m-a dus cu mașina la serviciu (mulțumesc, Roli!). Sper să te inspire să cauți simplitatea. Simplu este greu.

Dacă vrei să afli mai multe despre mine sau să-mi susții munca, poți vizita pagina mea de [GitHub](https://github.com/sponsors/manufacturist).
