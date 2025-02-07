[![Licență: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) | [:uk: English](./README.md) | [:romania: Română](./README.ro.md)

# Drumuri cu vecinii

O soluție cu zero costuri și interacțiune minimă pentru a face drumuri cu vecinii (carpooling), folosind Google Apps Script (GAS).

Este o soluție benefică pentru:
1. Clădiri rezidențiale
2. Birouri / companii mari
3. Comunități închegate

<br/>

### Cum funcționează?

Un vecin poate oferi o cursă completând un formular. În fiecare duminică, un email este trimis în jurul orei 19:00 cu o listă de curse disponibile pentru săptămâna următoare tuturor celor interesați:

```
Iată cursele disponibile:

🚗 Hotelul Vega (Gogu a lui Pupăză) | miercuri, 30.02, 13:37
Șofer: Nea Mărin (Juvete, 0712345678)
Plecare: Băilești, nr. 42 | Locuri: 3

Dacă o cursă îți este utilă, discută cu șoferul pentru a rezerva un loc.

Toate cele bune,
Drumuri cu vecinii
```

Vecinii pot apoi contacta șoferul pentru a rezerva un loc.

Pentru a utiliza această soluție, cineva din comunitate / cartier trebuie să îndeplinească rolul de Admin. Adminul trebuie să adauge manual utilizatorii într-un fișier Google de tip "Sheet". Doar utilizatorii adăugați în fișierul respectiv pot primi emailul de duminică și pot oferi curse prin formular.

<br/>

### Beneficiile acestei soluții

1. Nu are costuri! Nu necesită instalarea de aplicații, iar utilizatorii nu trebuie să se înregistreze pe nicio platformă

2. Funcționează cu maxim 100 de utilizatori (emailul de duminică)

3. Șoferii trebuie să aibă un cont Google, astfel că verificarea parțială a identității este făcută prin Google. Un email verificat este necesar la completarea formularului

4. Există un aspect social. Trebuie să contactezi direct vecinul șofer pentru a rezerva un loc

5. Este o metodă simplă de a reduce poluarea, de a te conecta cu vecinii și de a fi prietenos

:warning: 100 este limita de email-uri care pot fi trimise într-o zi, pentru conturile gratuite. 1500 pentru conturile workspace

<br/>

### Detalii tehnice

Pentru a instala, vei avea nevoie de un cont Google. Descarcă codul și alege una dintre următoarele metode:
* Dacă ești o persoană tehnică, îți recomand să folosești [clasp](https://github.com/google/clasp)
* Dacă nu, mergi la [Google Apps Script](https://script.google.com/home), creează un proiect nou și adaugă fișierele din folderul `src`

După ce ai configurat, mergi la fișierul `main.gs` și setează fusul orar local (modificare de cod). Apoi rulează funcția `main()`, care va:
1. Crea fișierul `Users` (Sheet)
2. Crea formularul `Offer Ride` (Form)
3. Crea fișierul `Ride Offers` (Sheet), unde vor fi salvate răspunsurile formularului
4. Crea un trigger care trimite un email utilizatorilor în fiecare duminică în jurul orei 19:00

Asta e tot. Singura ta sarcină rămasă este să populezi manual lista de utilizatori. Pentru fiecare utilizator va trebui să colectezi emailul, numele, numărul de telefon, limba dorită `[en, ro]` și opțional o referință (apartament / numărul casei / biroul / echipa / firma / ceva specific contextual).

Dacă ceva se strică, mult noroc <3 Mi-a venit fraza următoare în timp ce lucram cu GAS: *"Țesutul digital fragil care ține această soluție laolaltă este rupt. Distruge-l și reconstruiește-l"*. Aceasta sumarizează oarecum sentimentele mele față de GAS:
1. Ciclurile de dezvoltare sunt lungi pentru că trebuie să testezi manual totul
2. Regresia este necesară atunci când faci schimbări mari :(
3. Apreciez că există `clasp`, pentru că îmi permite să codez din VSC
4. Simplu... în mare parte

<br/>

### Procesul de dezvoltare

Clonează acest repo și însușește-ți-l. Nu există o soluție universală. Comunități diferite, nevoi diferite.

Deschide proiectul în VSC și instalează pachetele (`npm install`). Astfel vei avea sugestii când codezi și nu o vei lua razna. Folosește [clasp](https://github.com/google/clasp)!

Dacă faci o schimbare care aduce un beneficiu comunității tale și consideri că i-ar putea ajuta și pe alții, nu ezita să deschizi un PR. Dar ține cont de următoarele:
1. UX-ul trebuie să rămână simplu și minimalist
2. Dacă este prea personalizat pentru comunitatea ta și nu i-ar ajuta pe alții, nu te deranja :shrug:

Dacă vrei să faci o contribuție rapidă, poți adăuga suport pentru limba ta maternă dacă nu este deja prezentă (`contants.js`).

<br/>

### Idei pe care le-am încercat și abandonat

1. **Un formular pentru rezervarea unei curse**
   * Complică UX-ul și codul
   * Vrem să promovăm interacțiunea socială, nu să o limităm
   * Ce faci dacă șoferul nu cunoaște sau nu îi place persoana care a rezervat un loc?

2. **Formulare i18n pentru șoferi (formulare multiple)**
   * Complică codul
   * Engleza este baza

<br/>

### Despre această soluție

*"Cum pot crea o soluție de carpooling pentru orice comunitate cu un efort minim și costuri zero?"*, aceasta a fost provocarea pe care mi-am setat-o după ce un vecin s-a oferit să mă ducă la birou:
* Am citit juma' de zi de lucru despre diverse soluții pentru ajunge la o implementare concretă cu un efort pe cât se poate de redus
* Am petrecut aprox 1.5 zile de lucru pe această soluție (dezvoltare, clean-up, simplificare, testare)
* Folosind ChatGPT am accelerat dezvoltarea, finalizând primul PoC în 3 ore

Sper ca soluția să vă inspire să obțineți impact maxim cu efort minim.
