# vteam

# Svenska Elsparkcyklar AB

Detta är ett utvecklingsprojekt där vi bygger en **React‑frontend** tillsammans med en **PostgreSQL‑databas** som körs i Docker. Målet är att ha en **konsekvent och replikerbar utvecklingsmiljö** för alla i projektgruppen.

## Projektbeskrivning

Enligt vår SDS ska applikationen:

- Ha en modern React‑frontend skriven i JavaScript och Sass
- Använda Postgres som databas
- Köras helt i Docker för att undvika beroendeinstallationer på varje utvecklares dator

## Struktur

project/
    ├─ src/ # React‑kod
    ├─ public/ # Statisk frontend‑public-mapp
    ├─ .docker/ # Dockerkonfiguration
    │ ├─ react/ # Dockerfile för React‑container
    │ └─ postgres/ # init‑skript för Postgres
    │ └─ nginx/ # Nginx‑konfiguration
    ├─ docker-compose.yml # Docker Compose‑definition
    ├─ package.json # React‑projektets package.json
    └─ README.md # Denna fil


## Kom igång

1. Se till att du har **Docker och Docker Compose** installerat på din dator.  
2. Klona repo:  
   ```bash
   git clone https://github.com/CarlOscarMarcus/vteam
   cd vteam

Starta upp utvecklingsmiljön med Docker Compose:
    docker-compose up --build

    Öppna webbläsaren på:
    React‑frontend: http://localhost:3000

    Nginx (byggd React‑app, production): http://localhost:9080

    Databasen Postgres körs på port 5432 och kan nås med följande inloggning:
        User: admin
        Password: hoci1234
        Database: appdb