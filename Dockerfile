FROM node:20-alpine

RUN apk add --no-cache gettext

WORKDIR /app

COPY public/ ./public/
COPY server/ ./server/
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

HEALTHCHECK --interval=300s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-4000}/ || exit 1

ENTRYPOINT ["./docker-entrypoint.sh"]
