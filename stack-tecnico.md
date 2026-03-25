# Stack Tecnico - BizStudio Astro

Documento di riferimento per lo stack tecnologico del sito BizStudio.
Ogni voce spiega **cosa fa**, **perche' la usiamo** e **dove agisce**.

---

## Architettura Generale

```
┌─────────────────────────────────────────────────────────┐
│  BROWSER (quello che vede l'utente)                     │
│  └── HTML statico + CSS + JS minimo (solo dove serve)   │
├─────────────────────────────────────────────────────────┤
│  BUILD (quello che genera il sito)                      │
│  └── Astro + Vite → produce file statici pronti         │
├─────────────────────────────────────────────────────────┤
│  HOSTING (dove vive il sito)                            │
│  └── Qualsiasi hosting statico (Vercel, Netlify, ecc.)  │
└─────────────────────────────────────────────────────────┘
```

---

## 1. Meta-Framework: Astro 6

**Cosa fa:** E' il "cervello" del progetto. Prende i tuoi componenti, le pagine, gli stili e li trasforma in un sito statico (HTML + CSS + JS). E' lui che decide come costruire il sito.

**Perche lo usiamo:** Astro e' fatto per siti come il nostro — prevalentemente statici, con pochi pezzi interattivi. La sua filosofia e' "zero JavaScript di default": ogni pagina e' puro HTML finche' non decidi tu di aggiungere interattivita'.

**Dove agisce:** Solo durante il build (quando generi il sito). Il browser non sa nemmeno che Astro esiste.

**Concetti chiave:**
- **Pagine** (`.astro` in `src/pages/`) → ogni file diventa una URL del sito
- **Componenti** (`.astro` in `src/components/`) → pezzi riutilizzabili (header, footer, card, ecc.)
- **Layout** (`.astro` in `src/layouts/`) → strutture che avvolgono le pagine (tipo il template)
- **Islands** → i pochi pezzi React che si "accendono" nel browser

---

## 2. UI Framework: React 19

**Cosa fa:** Permette di creare componenti interattivi — cose che rispondono ai click, che cambiano stato, che si animano in risposta all'utente.

**Perche lo usiamo:** Per i 3-4 elementi del sito che hanno bisogno di interattivita' reale:
- Menu hamburger (apri/chiudi)
- Form di contatto (validazione, invio)
- Eventuali slider/carousel
- Eventuali filtri portfolio

**Dove agisce:** Nel browser, ma **solo** dove lo attiviamo con `client:visible` (si carica quando l'utente scrolla fino a quel punto) o `client:load` (si carica subito).

**Importante:** Il 90% del sito NON usa React. Sono componenti Astro puri (zero JS). React e' lo strumento chirurgico per i pezzi interattivi.

---

## 3. Styling: Tailwind CSS 4

**Cosa fa:** Sistema di styling tramite classi utility. Invece di scrivere CSS separato, scrivi le classi direttamente nell'HTML.

**Esempio pratico:**
```html
<!-- Senza Tailwind (CSS tradizionale) -->
<div class="hero-section">...</div>
<!-- poi nel CSS: .hero-section { padding: 4rem; background: black; } -->

<!-- Con Tailwind -->
<div class="p-16 bg-black">...</div>
```

**Perche lo usiamo:** Velocizza lo sviluppo, mantiene gli stili consistenti, il CSS finale contiene solo le classi che usi davvero (file leggerissimo).

**Dove agisce:** Durante il build (genera il CSS finale) e nel browser (il CSS viene applicato normalmente).

---

## 4. Animazioni: GSAP 3 + ScrollTrigger

**Cosa fa:** GSAP (GreenSock Animation Platform) e' la libreria professionale per animazioni web. ScrollTrigger e' il suo plugin che attiva animazioni quando l'utente scrolla.

**Esempio pratico:**
- Testi che appaiono dal basso mentre scrolli
- Immagini che si ingrandiscono entrando nella viewport
- Sezioni che si trasformano durante lo scroll
- Transizioni fluide tra stati

**Perche lo usiamo:** Il sito Webflow ha animazioni legate allo scroll. GSAP e' lo standard industriale per replicarle (e migliorarle). Nessuna alternativa e' altrettanto potente e affidabile.

**Dove agisce:** Nel browser, quando l'utente interagisce con la pagina.

---

## 4b. Text Splitting: SplitType

**Cosa fa:** Prende un blocco di testo e lo spacchetta in singoli elementi HTML — ogni parola o ogni lettera diventa un `<span>` separato. Questo permette a GSAP di animare ogni pezzo individualmente.

**Esempio pratico:**
```
Prima:  <p>BizStudio crea il tuo brand</p>

Dopo:   <p>
          <span>BizStudio</span>
          <span>crea</span>
          <span>il</span>
          <span>tuo</span>
          <span>brand</span>
        </p>
```

**Effetti che abilita (insieme a GSAP):**
- **Text highlight on scroll** — scrollando, le parole/lettere si "accendono" progressivamente (da grigio a bianco, da trasparente a opaco). Scrollando indietro, tornano spente
- **Text reveal lettera per lettera** — ogni carattere appare con un ritardo
- **Animazioni per parola** — ogni parola entra da una direzione diversa

**Perche lo usiamo:** Senza SplitType, GSAP puo' animare solo il blocco intero. Con SplitType, anima ogni singola lettera o parola. E' il segreto dietro gli effetti testo dei siti Awwwards.

**Dove agisce:** Nel browser, lavora insieme a GSAP.

---

## 5. Smooth Scroll: Lenis

**Cosa fa:** Rende lo scroll della pagina "morbido" e fluido, invece del comportamento nativo a scatti del browser.

**Perche lo usiamo:** I siti Webflow usano tipicamente smooth scroll. Lenis lo replica con prestazioni eccellenti. Funziona bene insieme a GSAP/ScrollTrigger.

**Dove agisce:** Nel browser, cattura l'evento di scroll e lo rende graduale.

**Nota:** E' un effetto sottile ma fa la differenza nella percezione di qualita' del sito.

---

## 6. Font: Fontsource — Inter Variable

**Cosa fa:** Fontsource permette di installare Google Fonts (e altri) come pacchetti npm, cosi' li ospiti direttamente sul tuo server invece di caricarli da Google.

**Font variabile** = un singolo file che contiene tutti i pesi (da thin 100 a black 900). Invece di scaricare 5 file separati per 5 pesi, ne scarichi 1 solo, piu' leggero e flessibile.

**Configurazione:**
- **Inter Variable** → unico font per tutto il sito (titoli, corpo, UI, navigazione)
- Gerarchia visiva creata con pesi diversi (400 regular, 500 medium, 600 semibold, 700 bold)
- Coerente con il sito Webflow attuale (Inter VF, peso 500)

**Perche lo usiamo:** Self-hosting dei font = nessuna richiesta esterna a Google = piu' veloce + migliore privacy. Un solo font variabile = un solo file da scaricare per tutti i pesi.

**Dove agisce:** I file font vengono inclusi nel build. Il browser li carica localmente.

---

## 7. State Management: Nanostores

**Cosa fa:** Permette a componenti React diversi sulla stessa pagina di condividere dati tra loro.

**Esempio pratico:**
- La navbar sa che il form di contatto e' aperto
- Un bottone in una sezione puo' aprire un modale in un'altra sezione
- Stato condiviso tra island React separati

**Perche lo usiamo:** In Astro, ogni island React e' isolato. Se due componenti React devono "parlarsi", Nanostores fa da ponte. Pesa solo ~1KB.

**Dove agisce:** Nel browser, come strato di comunicazione tra componenti.

**Nota:** Per il progetto attuale il bisogno e' minimo. E' incluso preventivamente per non dover ristrutturare se emerge la necessita'.

---

## 8. Icone: Lucide React

**Cosa fa:** Libreria di icone SVG open source. Offre centinaia di icone pulite e consistenti (frecce, menu, social, utility, ecc.).

**Perche lo usiamo:** Invece di cercare icone SVG sparse o usare icon font pesanti (come FontAwesome), Lucide e' leggero e importi solo le icone che usi.

**Esempio:**
```jsx
import { Menu, ArrowRight, Mail } from 'lucide-react'

<Menu size={24} />        // icona hamburger
<ArrowRight size={16} />  // freccia
<Mail size={20} />        // icona email
```

**Dove agisce:** Nel build (le icone vengono incluse come SVG inline) e nel browser (rendering SVG).

---

## 9. Utility: clsx + tailwind-merge

**Cosa fa:** Due piccole utility per gestire le classi CSS in modo pulito.

- **clsx** → unisce classi CSS condizionalmente
- **tailwind-merge** → risolve conflitti tra classi Tailwind

**Esempio pratico:**
```jsx
// Senza clsx
<div className={`p-4 ${isActive ? 'bg-blue-500' : 'bg-gray-500'} ${isLarge ? 'text-xl' : ''}`}>

// Con clsx (piu' leggibile)
<div className={clsx('p-4', isActive ? 'bg-blue-500' : 'bg-gray-500', isLarge && 'text-xl')}>
```

**Perche lo usiamo:** Rendono il codice piu' leggibile e prevengono bug di styling.

**Dove agisce:** Durante il build (generazione classi) e nel browser (componenti React).

---

## 10. Build: Vite + pnpm

### Vite
**Cosa fa:** E' il bundler — prende tutti i tuoi file (componenti, CSS, immagini, font) e li impacchetta in file ottimizzati per il browser.

**Perche lo usiamo:** Astro usa Vite internamente. E' velocissimo in sviluppo (le modifiche appaiono istantaneamente nel browser) e produce build ottimizzati per produzione.

### pnpm
**Cosa fa:** Package manager — installa e gestisce le dipendenze (tutte le librerie sopra).

**Perche lo usiamo:** Piu' veloce e leggero di npm. Usa hard link invece di copiare file, quindi occupa meno spazio disco e installa piu' velocemente.

**Dove agiscono:** Solo in sviluppo e durante il build. Non esistono nel sito finale.

---

## 11. CSS Keyframes (nativo)

**Cosa fa:** Animazioni CSS native del browser, senza librerie. Per micro-animazioni semplici che non dipendono dallo scroll.

**Esempio pratico:**
- Effetto "blob" che pulsa in background
- Hover su bottoni (ingrandimento, cambio colore)
- Spin di icone di caricamento
- Transizioni di colore
- Gradiente animato in loop dentro le scritte

**Perche lo usiamo:** Per animazioni semplici e ripetitive, CSS puro e' piu' performante di GSAP. Non ha senso usare una libreria per un hover.

**Dove agisce:** Nel browser, gestito direttamente dal motore CSS.

---

## 12. PostCSS

**Cosa fa:** Processore CSS che trasforma il tuo CSS durante il build. Tailwind CSS lo usa internamente per funzionare.

**Perche lo usiamo:** E' un requisito di Tailwind CSS 4. Non ci interagisci direttamente, lavora in background.

**Dove agisce:** Solo durante il build.

---

## 13. TypeScript

**Cosa fa:** Versione "tipizzata" di JavaScript. Aggiunge controlli che prevengono errori prima ancora di aprire il browser.

**Perche lo usiamo:** Riduce i bug, l'editor ti suggerisce metodi e proprieta', il refactoring e' piu' sicuro.

**Dove agisce:** Solo in sviluppo e durante il build. Il browser riceve JavaScript normale.

---

## 14. Node.js >= 22.12

**Cosa fa:** L'ambiente di runtime che esegue JavaScript sul tuo computer (fuori dal browser). Serve per far girare Astro, Vite, e tutti gli strumenti di build.

**Perche questa versione:** Astro 6 richiede Node.js recente per funzionalita' moderne. La versione 22 e' LTS (Long Term Support = supportata a lungo).

**Dove agisce:** Solo sul tuo computer durante lo sviluppo e il build. Il sito finale e' statico e non ha bisogno di Node.js per funzionare.

---

## Riepilogo Visuale

```
Cosa vede l'utente nel browser:
├── HTML statico (generato da Astro)
├── CSS (generato da Tailwind + PostCSS)
├── Font Inter Variable (self-hosted via Fontsource)
├── Icone SVG (Lucide)
├── Animazioni scroll (GSAP + ScrollTrigger)
├── Text highlight on scroll (SplitType + GSAP)
├── Smooth scroll (Lenis)
├── Gradienti animati nelle scritte (CSS Keyframes)
├── Micro-animazioni (CSS Keyframes)
└── Pochi componenti interattivi (React islands)
    └── Stato condiviso se necessario (Nanostores)

Cosa gira solo in sviluppo/build:
├── Astro 6 (genera il sito)
├── Vite (bundler)
├── PostCSS (processa CSS)
├── TypeScript (controlla errori)
├── Node.js (ambiente runtime)
└── pnpm (gestisce pacchetti)
```

---

## Struttura Cartelle

```
bizstudioastro/
├── src/
│   ├── pages/              → le pagine del sito (ogni file = una URL)
│   ├── layouts/            → template che avvolgono le pagine
│   ├── components/
│   │   ├── sections/       → sezioni grandi (hero, portfolio, ecc.)
│   │   ├── ui/             → elementi piccoli riutilizzabili (bottoni, card)
│   │   └── react/          → componenti React interattivi (islands)
│   ├── styles/             → CSS globale e utility
│   ├── lib/                → funzioni utility e animazioni
│   └── assets/             → immagini e font
├── public/                 → file statici (favicon, robots.txt)
├── webflow-export/         → export HTML dal sito Webflow (riferimento)
└── stack-tecnico.md        → questo file
```

---

*Ultimo aggiornamento: 2026-03-20*
