# Svenska Elsparkcyklar AB – VTEAM-projektet Backend

Detta repository innehåller backend-delen för VTEAM-projektet. Backenden ansvarar för API-logik och databaskommunikation.

Projektet är uppdelat i två huvuddelar:
- **API** – Hanterar HTTP-förfrågningar och affärslogik
- **Databaser** – Hanterar lagring av data

---

## API

API:t är byggt med **Express.js** och fungerar som en server som tar emot HTTP(S)-förfrågningar via olika endpoints (URL:er). Dessa endpoints returnerar eller modifierar data relaterad till elsparkcykelsystemet.

### Datatyper / Resurser

API:t hanterar följande resurser:

- Users
- Auth
- Scooters
- Parking
- Charging
- Receipts
- Rent
- History

Varje resurs har sin egen router och nås via följande struktur: `/api/{resurs}/{action}`

Nedan listas samtliga endpoints och deras funktioner.

---

## Users

- `/api/users/`  
  Returnerar alla användare med följande fält:  
  `id, email, name, status, created_at`

- `/api/users/me`  
  Returnerar information om inloggad användare:  
  `id, email, name`

- `/api/users/balance`  
  Returnerar saldo (`balance`) för inloggad användare

- `/api/users/balance/topup`  
  Fyller på saldo för en användare

- `/api/users/delete/:id`  
  Raderar en specifik användare

---

## Scooters

- `/api/scooters`  
  Returnerar all information om samtliga elsparkcyklar

- `/api/scooters/:id`  
  Returnerar information om en specifik elsparkcykel

- `/api/scooters/:id/repairs`  
  Returnerar all reparationshistorik för en elsparkcykel

- `/api/scooters/:id/repairs/add`  
  Lägger till en ny reparation för en elsparkcykel

- `/api/scooters/:id/repairs/end`  
  Avslutar pågående reparation

- `/api/scooters/:id/battery/:value`  
  Uppdaterar batterinivån för en elsparkcykel

- `/api/scooters/update/:id`  
  Uppdaterar elsparkcykelns position

- `/api/scooters/:id/status`  
  Ändrar status på elsparkcykeln (t.ex. tillgänglig, uthyrd, trasig)

---

## Receipts

- `/api/receipts/`  
  Returnerar alla kvitton

- `/api/receipts/:id`  
  Returnerar ett specifikt kvitto

- `/api/receipts/:id/pay`  
  Betalar ett kvitto/faktura

---

## Parking

- `/api/parking/`  
  Returnerar alla parkeringsplatser

---

## History

- `/api/history`  
  Returnerar alla avslutade åkturer

- `/api/history/user/:id`  
  Returnerar alla åkturer som en specifik användare har genomfört

- `/api/history/ticket/:id`  
  Returnerar information om en specifik åktur

- `/api/history/create/:start/:end/:user_id`  
  Skapar en ny åktur i historiken

---

## Charging

- `/api/charging/`  
  Returnerar alla laddstationer

- `/api/charging/update/:id/:scooter_id`  
  Markerar en laddstation som upptagen av en elsparkcykel

- `/api/charging/stop/:id`  
  Avslutar laddning och gör laddstationen ledig igen

---

## Rent

- `/api/rent/start`  
  Startar uthyrning av en elsparkcykel till en användare

- `/api/rent/end`  
  Avslutar pågående uthyrning

---

## Auth

- `/api/auth/login`  
  Loggar in användare med e-post och lösenord

- `/api/auth/oauth`  
  Loggar in användare via Google OAuth

- `/api/auth/me`  
  Returnerar kontoinformation för inloggad användare

- `/api/auth/signup`  
  Skapar ett nytt användarkonto

---

## Filstruktur
├── api
│ ├── Dockerfile
│ ├── app.js
│ ├── db.js
│ ├── jest.config.mjs
│ ├── middleware
│ │ └── auth.js
│ ├── package-lock.json
│ ├── package.json
│ ├── routes
│ │ ├── auth.route.js
│ │ ├── charging.route.js
│ │ ├── history.route.js
│ │ ├── parking.route.js
│ │ ├── receipt.route.js
│ │ ├── rent.route.js
│ │ ├── scooters.route.js
│ │ └── users.route.js

---
## Databas

Databasen är driven med ***PostgreSQL*** och tar hand om att lagra data på ett originerat sätt. Databasen hanterar samma resurers med samma kategorier som api:en.

---
### Users

Lagrar information om användare i systemet och kopplar ändra tappeler med anvädare id för att koppla kunder till andra tabeller.

    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) DEFAULT 'Joe Doe',
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT DEFAULT 0,
    balance DECIMAL(10,2) DEFAULT 0

---
### Scooters

Lagrar infomation om elsparkcyklarna.

    id SERIAL PRIMARY KEY,
    battery INT NOT NULL DEFAULT 0,
    position_lat DECIMAL(9,6) NOT NULL,
    position_long DECIMAL(9,6) NOT NULL,
    status TEXT DEFAULT 'ok', -- ok / service / charging
    is_available BOOLEAN DEFAULT true -- true
     if avaible for rent, false if already rented

---
### Receipt

Lagarar fakturer och kvitton som är kopplat till anvädaren genom sitt id. Databasen sätter också en förfallningsdatuom automatiskt på ***14 dagar*** efter åkturen.

    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    cost INT NOT NULL,
    payment INT NOT NULL,
    due_date TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '14 days'),
    CONSTRAINT fk_receipt_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE

---
### Repair

Lagrar infomationen om reprationer och reprations historik på elskapcyklarna. 

    id SERIAL PRIMARY KEY,
    scooter_id INT NOT NULL,
    start_day TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estimated_repair TIMESTAMP NOT NULL,
    work_done TIMESTAMP,
    status INT DEFAULT 0,
    CONSTRAINT fk_repair_scooter
        FOREIGN KEY (scooter_id)
        REFERENCES scooter (id)
        ON DELETE CASCADE


---
### Parking

Lagrar vart elsparkcyklarna är parkerade.

    id SERIAL PRIMARY KEY,
    position_lat VARCHAR(255),
    position_long VARCHAR(255),
    status INT DEFAULT 0

---
### Charging

Lagrar vart laddningstationer finns och deras tillgänglighet. 

    id SERIAL PRIMARY KEY,
    position_lat VARCHAR(255),
    position_long VARCHAR(255),
    scooter_id INT DEFAULT NULL,
    status INT DEFAULT 1   -- 1 = upptagen, 0 = ledig

---
### History

Lagrar åktur historik främst start position och slutposition tillsamans med datum som är kopplat till användar id.

    id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    start_location VARCHAR(255),
    end_location VARCHAR(255),
    user_id INT,
    CONSTRAINT fk_history_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE

---
### Rental

Lagrar en mer detaljerad historik på åkturer än history.

    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    scooter_id INT NOT NULL,
    start_time TIMESTAMP DEFAULT NOW(),
    end_time TIMESTAMP,
    active BOOLEAN DEFAULT true,

    CONSTRAINT fk_rental_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_rental_scooter
        FOREIGN KEY (scooter_id)
        REFERENCES scooter (id)
        ON DELETE CASCADE
