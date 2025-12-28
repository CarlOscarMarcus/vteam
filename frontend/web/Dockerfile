FROM node:20

# Sätt arbetskatalog
WORKDIR /app

# Kopiera package-filer först (snabbare builds)
COPY package*.json ./

# Installera dependencies
RUN npm install

# Kopiera resten av koden
COPY . .

# Exponera dev-porten (Vite = 5173, CRA = 3000)
EXPOSE 5173

# Starta dev-servern
CMD ["npm", "run", "dev"]
