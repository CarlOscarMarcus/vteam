# HOCI Scooters AB – Frontend

Vår webbsida till VTEAM-projektet för elsparkcyklar. Vi har valt att namnge vårt imaginära företag till HOCI Scooters AB.

## Beskrivning av webbgränssnittet

Webbgränssnittet är uppbyggt av:

- Komponenter, exempelvis header, footer, navbar.
- Startsida och andra tillhörande sidor därtill.
- SASS och bilder till styling.

Sidor innan inloggning:
- Startsida.
- Sida för inloggning.
- Sida för att starta inloggning.

Sidor efter inloggning.
- Startsida.
- Profil.
- Historik.
- Saldo.
- Karta.

## Struktur

```
web/
├── eslint.config.js
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── public
├── README.md
├── src
└── vite.config.js

web/src/
├── App.jsx
├── assets
│   ├── img
│   │   ├── earth.jpg.avif
│   │   ├── elsparkcykel.jpg
│   │   ├── money.jpg.avif
│   │   └── scooter.jpg
│   ├── react.svg
│   └── styles
│       ├── components
│       │   ├── app.scss
│       │   ├── footer.scss
│       │   ├── header.scss
│       │   ├── home.scss
│       │   └── navbar.scss
│       ├── main.scss
│       ├── pages
│       │   └── Index.scss
│       └── variables.scss
├── components
│   ├── Auth.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   └── Navbar.jsx
├── context
│   └── UserContext.jsx
├── main.jsx
└── pages
    ├── history.jsx
    ├── Home1.jsx
    ├── Login.jsx
    ├── Logout.jsx
    ├── Map.jsx
    ├── profile.jsx
    ├── saldo.jsx
    └── signup.jsx

## Starta webbgränssnittet

1. Stå i frontend/web/
2. Första gången, kör: npm install
3. Kör: npm run dev
4. Öppna projektet i webbläsaren via: localhost:5173
```
