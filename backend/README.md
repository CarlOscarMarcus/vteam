# # Svenska Elsparkcyklar AB – VTEAM-projektet Backend
I backend mappen finns funktionaliteten av API och databaser. 
Backenden är uppdelad i två olika mappar api och databaser.

## API
Api:et är uppbyggt med express js som server för att ta emot https request genom url:er som returnerar data angånde olika datatyper. 

De olika typerna av infomation som finns är users, auth, scooters, parking, charging, receipts, rent och history. All de routers är orginaserade på sitt egna api route. Som gör att alla de nämda typerna av infomation går att hämtas genom /api/{type}/{action}. Nedan kommer alla rutter bli nämnda och beskriven vad den gör.

### Users
`/api/users/` Returnerar `id, email, name, status, created_at` på alla konton.
`/api/users/me` Returnerar `id, email, name` på ett konto bestämt.
`/api/users/balance` Retuernerar `balance` på ett konto bestämt.
`/api/users/balance/topup` Fyller på en användares `balance` 
`/api/users/delete/:id` Raderar en bestämd användare

### Scooters
`/api/scooters` Returnerar all infomation om alla elsparkcyklarna.
`/api/scooters/:id` Returnerar all infomation om en elsparkcykel.
`api/scooters/:id/repairs` Retuernerar all reprations infomation om en elsparkcykel.
`/api/scooters/:id/repairs/add` Lägger till en repration på en elsparkcykel.
`/api/scooters/:id/repairs/end` Ansluta nuvarande repration på en elsparkcykel.
`/api/scooters/:id/battery/:value` Ändrar batteri mängden på en elsparkcykel.
`/api/scooters/update/:id` Uppdaterar elsparkcykelns position.
`/api/scooters/:id/status` Ändrar statusen på elsparkcykel.

### Receipt
`/api/receipts/` Returnerar alla kvitton.
`/api/receipts/:id` Returnerar ett bestämt kvitto.
`/api/receipts/:id/pay` Betalning av faktura/kvitto.

### Parking
`/api/parking/` Returnerar alla parkeringsplatser. 

### History
`/api/history` Returnerar all anklarade åkturer
`/api/history/user/:id` Retuernerar alla åkturet som en anvädare har gjort.
`/api/history/ticket/:id` Returnerar en bestämd åktur.
`/api/history/create/:start/:end/:user_id` Skapar åktur historik.

### Charging
`/api/charging/` Returnerar alla laddningstationer. 
`/api/charging/update/:id/:scooter_id` Sätter laddningstationer som upptagen med en elsparkcykel.
`/api/charging/stop/:id` Avslutar laddningen av elsparkcykeln och gör laddningstationen ledig igen.

### Rent
`/api/rent/start` Startar uthyrning av elsparkcykel till anvädare
`/api/rent/end` Avslutat nuvarade uthyrning av elsparkcykel till anvädare.

### Auth
`/api/auth/login` Loggar in anvädare om användaruppgifter är rätt.
`/api/auth/oauth` Loggar in med sitt google konto.
`/api/auth/me` Visar kontoinformation om en anvädare.
`/api/auth/signup` Skapar anvädar konto.

### Filstruktur

├── api
│   ├── Dockerfile
│   ├── app.js
│   ├── db.js
│   ├── jest.config.mjs
│   ├── middleware
│   │   └── auth.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── auth.route.js
│   │   ├── charging.route.js
│   │   ├── history.route.js
│   │   ├── parking.route.js
│   │   ├── receipt.route.js
│   │   ├── rent.route.js
│   │   ├── scooters.route.js
│   │   └── users.route.js
