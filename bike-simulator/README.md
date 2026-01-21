# Cykelsimulator

Här finns instruktioner för hu du kommer igång med simulatorn. Simulatorn skriver ut meddelanden (loggar) och visas även på kartan i webbklienten. 

### Alternativ 1
Om du vill kika på loggarna och kartan, är detta det lättaste sättet. Man kan starta igång allting samtidigt med docker compose i samma terminalfönster men det kan bli lite rörigt att följa med i loggarna då på grund av att det är många olika services som startar igång.

- I ett fönster, skriv: ```docker compose up --build api db frontend```
- I ett separat fönster: ```docker compose up --build bike-simulator```
- Öppna webbläsaren och gå in på localhost:5173. Logga in och gå till kartan.

### Alternativ 2
Om du vill starta igång allt så snabbt och så enkelt som möjligt:
- ```docker compose up --build``` 

Du kan justera mängden cyklar, parkeringsplatser och laddare i filen bike-simulator -> createScooters.js

Du kan justera mängden användare i filen bike-simulator -> index.js.