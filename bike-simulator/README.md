# Bike simulator

The simulator will show scooters moving on the map in the webclient. Keep a console open for messages from all the scooters, the scooters will tell their position, speed, battery status and when they are rented/returned by a user.

### To get the simulator working:
- run ```docker compose up --build```

### Or if you want to have a separate terminal to view console.log-messages
- in one window run ```docker compose up --build api db frontend```
- in another window run ```docker compose up --build simulator```