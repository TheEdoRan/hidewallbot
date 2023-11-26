# Compile
FROM node:20 AS compiler
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src src
RUN npm run compile

# Run
FROM node:20 AS runner
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY --from=compiler /usr/src/app/dist /usr/src/app
USER node:node
CMD ["node", "bot.js"]