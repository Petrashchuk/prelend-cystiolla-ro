#!/bin/sh
set -e

# Підставляємо змінні з .env у статичні файли перед стартом nginx
for file in \
  /usr/share/nginx/html/index.html \
  /usr/share/nginx/html/quiz.html \
  /usr/share/nginx/html/js/main.js; do
  envsubst '${OFFER_URL} ${FB_PIXEL_ID} ${DOMAIN}' < "$file" > "$file.tmp"
  mv "$file.tmp" "$file"
done

exec nginx -g 'daemon off;'
