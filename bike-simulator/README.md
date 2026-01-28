# Cykelsimulator

Här finns instruktioner för hu du kommer igång med simulatorn. Simulatorn skriver ut meddelanden (loggar) och visas även på kartan i webbklienten. 

### Alternativ 1 (loggar + karta)
- ```docker compose up --build bike-simulator frontend```
- Öppna webbläsaren och gå in på localhost:5173. Logga in och gå till kartan.

### Alternativ 2 (bara loggar)
Om bara vill följa simulatorns loggar i ett terminalfönster:
- ```docker compose up --build bike-simulator``` 

Du kan justera mängden cyklar, parkeringsplatser och laddare i filen bike-simulator -> createScooters.js

Du kan justera mängden användare i filen bike-simulator -> index.js.