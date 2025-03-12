FROM oven/bun:1 AS build

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile --production

RUN bun run build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/.next/standalone .
COPY --from=build /app/.next/static ./.next/static/
COPY --from=build /app/public ./public/

EXPOSE 3000

CMD ["node", "server.js"]