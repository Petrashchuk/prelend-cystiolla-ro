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

ENTRYPOINT ["/docker-entrypoint.sh"]
