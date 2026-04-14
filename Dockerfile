FROM nginx:alpine

# Встановлюємо gettext для envsubst
RUN apk add --no-cache gettext

# Копіюємо статику
COPY . /usr/share/nginx/html

# Копіюємо конфіги
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=300s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-4000}/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
