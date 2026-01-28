# Svenska Elsparkcyklar AB – VTEAM-projektet

Detta är ett utvecklingsprojekt där gruppen bygger en applikation med hjälp av Javascript, React-frontend, PostgreSQL-databas, samt kör hela miljön via Docker Compose. Syftet är att skapa en stabil och enhetlig utvecklingsmiljö för alla i gruppen.

## Projektbeskrivning

Enligt vår SDS ska applikationen:

- Ha en React-frontend skriven i JavaScript och Sass
- Använda PostgreSQL som databas
- Köras helt i Docker för att undvika lokala beroenden
- Hantera miljöer via Docker Compose (dev/production)

## Struktur
```
VTEAM/
├─ backend/
│  ├─ api/           # Backend-kod (t.ex. Node/Express eller annan backend)
│  ├─ db/            # Databas-relaterade filer, migrations, scripts
│  └─ README.md
│
├─ docker/
│  ├─ .docker/       # Dockerfiles och service-konfiguration
│  ├─ data/          # Volymer / persistent data
│  └─ node_modules/  # (Ignorera – bör normalt inte ligga i repo)
│
├─ frontend/
│  ├─ app/           # React-appen (src, public etc beroende på setup)
│  └─ web/           # Eventuell separat web/router/build-mapp
│
├─ bike-simulator/   # Filerna som krävs för simulering
│  
docker-compose, miljöer
│
├─ .gitignore
├─ package.json      # Root-config (monorepo eller arbetsyta?)
├─ package-lock.json
└─ README.md         # Projektets huvud-README
```

## Kom igång

1. Installera krav
Du behöver ha:
Docker Desktop (inkl. Docker Compose)

2. Klona projektet
git clone https://github.com/CarlOscarMarcus/vteam
cd vteam

3. Starta utvecklingsmiljön med Docker Compose
```docker-compose up --build```

(Om du vill starta utan att simulatorn kör i bakgrunden)
``` docker compose up --build frontend```

4. Öppna projektet i webbläsaren
E-postadresser som slutar på "@admin.se" kommer att loggas in som administratör och få en annan meny med andra funktioner. Övriga e-postadresser loggas in som vanlig användare.

Databasuppgifter (default)
    User: admin
    Password: hoci1234
    Database: appdb
