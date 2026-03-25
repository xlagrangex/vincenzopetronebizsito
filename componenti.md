# Componenti & Regole di Stile - BizStudio

Documento di riferimento per i componenti UI e le regole di design del sito.
Aggiornato ogni volta che si definisce un componente.

---

## Palette Colori BizStudio

- **Arancione**: `#DA5713`
- **Magenta**: `#A51B80`
- **Blu**: `#1B4088`
- **Gradiente brand**: `linear-gradient(135deg, #1B4088, #A51B80 50%, #DA5713)`

---

## Regole Generali

### Layout
- **Sfondi e animazioni**: full-width, nessun limite
- **Contenuto** (testi, bottoni, griglie): `max-w-[1440px]` centrato con `mx-auto`
- **Sezioni dense di testo**: `max-w-3xl` o `max-w-4xl`

### Heading
- **Font weight**: sempre `font-bold` (700) su tutti gli heading (h1, h2, h3)
- **Letter spacing**: sempre `tracking-[-0.03em]`
- **Spaziature sezioni**: compatte, niente padding esagerato tra sezioni

### Bottoni
- **Rounding**: sempre `rounded-full` (pillola, bordi completamente tondi)
- Questa regola vale per TUTTI i bottoni del sito, homepage e pagine interne

---

## Componenti

### ButtonGradient

**File:** `src/components/ui/ButtonGradient.astro`

**Varianti:**
- `light` — sfondo gradiente brand (`#1B4088 → #A51B80 → #DA5713`)
- `dark` — sfondo scuro

**Forma:** pillola (`rounded-full`)

**Proporzioni:** `padding: 1rem 2rem`, `font-size: 1.125rem`

**Effetti hover:**
- **Scale up** — ingrandimento leggero (`scale: 1.05`)
- **Glow intenso** — il glow esterno magenta si espande
- **Ball acceleration** — le ball interne si muovono piu' velocemente
- **Inner shadow** — l'ombra interna diventa piu' luminosa

**Effetto active (click):**
- Leggero spostamento verso il basso
- Ombra ridotta

**Props:**
- `href` — link destinazione
- `text` — testo del bottone
- `variant` — `"dark"` (default) o `"light"`

---

### ContactCard

**File:** `src/components/react/ContactCard.tsx`

**Tipo:** React island (`client:visible`)

**Comportamento:**
- Mostra foto fondatore + "Prenota una consulenza gratuita"
- Al **hover** si espande mostrando: Email, Telefono, Prenota ora
- Dot verde pulsante in alto a destra
- Sfondo glass blur (`bg-white/20 backdrop-blur`)

---

*Ultimo aggiornamento: 2026-03-20*
