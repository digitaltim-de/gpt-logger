# Basis-Image
FROM node:20

# Arbeitsverzeichnis
WORKDIR /app

# Nur package.json zuerst kopieren und installieren (besserer Cache)
COPY package*.json ./

RUN npm install

# Restlichen Code kopieren
COPY . .

# Port freigeben
EXPOSE 3004

# Startbefehl
CMD ["node", "server.js"]
