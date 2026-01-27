# basic dockerfile

# run node
FROM node:18-alpine
RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x sim.sh

CMD ["./sim.sh"]
