# Loredana Roșca — Website Portfolio

Website personal de prezentare a serviciilor de web design.

---

## Structura fișierelor

```
site/
├── index.html               — Pagina principală
├── styles.css               — Toate stilurile CSS
├── script.js                — Interactivitate (nav, scroll, animații)
├── assets/
│   ├── hero-placeholder.svg         — Placeholder secțiune hero (opțional)
│   ├── portfolio-1-placeholder.svg  — Placeholder proiect Ofuro Botanica
│   ├── portfolio-2-placeholder.svg  — Placeholder proiect 2 (nefolosit activ)
│   └── portfolio-3-placeholder.svg  — Placeholder proiect 3 (Consultant)
└── README.md
```

---

## Unde înlocuiești poza ta

Poza este integrată Base64 direct în `index.html` — nu necesită fișier extern.  
Apare în două locuri: secțiunea hero și secțiunea "De ce să lucrezi cu mine".

Dacă vrei să o înlocuiești cu un fișier extern:
1. Pune poza în `assets/loredana.jpg`
2. Caută în `index.html` toate aparițiile `src="data:image/jpeg;base64,..."`
3. Înlocuiește cu `src="assets/loredana.jpg"`

---

## Unde modifici textele principale

Toate textele sunt în `index.html`, cu secțiuni comentate:

| Secțiune | Comentariu în HTML |
|---|---|
| Hero | `<!-- HERO -->` |
| Problemă | `<!-- PROBLEMĂ -->` |
| Soluție | `<!-- SOLUȚIE -->` |
| Ce include | `<!-- CE PRIMEȘTI -->` |
| Portofoliu | `<!-- PORTOFOLIU -->` |
| Pachete / Prețuri | `<!-- PREȚURI -->` |
| Mentenanță | `<!-- DUPĂ LANSARE -->` |
| Proces | `<!-- PROCES -->` |
| Despre / De ce eu | `<!-- DE CE EU -->` |
| CTA final | `<!-- CTA FINAL -->` |

---

## Cum schimbi numărul de telefon / WhatsApp

Caută toate aparițiile `40737362360` în `index.html` și înlocuiește cu numărul tău.

Mesajul pre-completat din WhatsApp (după `?text=`) poate fi modificat — e URL-encoded.

---

## Cum schimbi culorile

Deschide `styles.css`. La început găsești variabilele:

```css
:root {
  --cobalt:       #1A56DB;   /* culoarea principală — schimbă aici */
  --cobalt-light: #3B73F0;   /* hover */
  --dark:         #0C1A3A;   /* fundal dark / text */
  --bg:           #F2F5FC;   /* fundal principal */
}
```

---

## Filtrele pe poze

Poza ta are aplicate CSS filtre pentru un aspect cald și editorial:
```css
filter: contrast(1.04) saturate(0.82) brightness(0.97) sepia(0.06);
```
+ un overlay `::after` cald discret.

Poți ajusta valorile direct în `styles.css`, la secțiunile `.hero-photo-ring img` și `.whyme-photo img`.

---

## Cum publici pe Netlify

Drag & drop folderul `site/` pe [app.netlify.com/drop](https://app.netlify.com/drop).  
Site live instant. Domeniu custom opțional din panoul Netlify.

---

## Note tehnice

- Fonturile se încarcă de pe Google Fonts (Lora + Outfit) — necesită internet
- Nu există dependențe externe (no jQuery, no frameworks)
- Vanilla HTML/CSS/JS — ușor de modificat de oricine
- Poza integrată Base64 — funcționează și fără server

