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

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
