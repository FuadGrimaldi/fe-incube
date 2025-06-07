# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Salin seluruh source code dan build
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Salin hasil build dan node_modules dari builder
COPY --from=builder /app /app

# Install hanya dependency produksi
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]
