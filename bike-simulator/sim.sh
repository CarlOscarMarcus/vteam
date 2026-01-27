#!/bin/sh

echo "Väntar på API..."
until curl -s http://api:3000/api/health >/dev/null; do
    sleep 2
done

echo "Skapar scooters, parkeringar och laddare för simulator..."
node createScooters.js

echo "Startar simulator..."
npm start