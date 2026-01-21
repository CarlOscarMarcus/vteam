# Bike simulator

The simulator will show scooters moving on the map in the webclient. Keep a console open for messages from all the scooters, the scooters will tell their position, speed, battery status and when they are rented/returned by a user.

### best way
If you are interested in reading the logs from the simulator and look at the map, we recommend you do it this way since the logs will be in a separate window. If you just want to view the simulation on the map. The way below is easier/quicker.

- in one window run ```docker compose up --build api db frontend```
- in another window, run ```docker compose up --build bike-simulator```

### You can also do it all at once
- ```docker compose up --build``` 

You can adjust the amount of bikes, parkings, chargers in the file bike-simulator -> createScooters.js

To adjust the amount of users, go to bike-simulator -> index.js