# Compile
FROM node:16-alpine AS compiler
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src src
RUN npm run compile

# Install
FROM node:16-alpine AS installer
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY --from=compiler /usr/src/app/dist /usr/src/app

# Run
FROM gcr.io/distroless/nodejs:16 AS runner
WORKDIR /app
COPY --from=installer /usr/src/app /app
USER nonroot:nonroot
CMD ["bot.js"]
