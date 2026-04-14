#!/bin/sh
set -e

for file in \
  /app/public/index.html \
  /app/public/quiz.html \
  /app/public/js/main.js; do
  envsubst '${OFFER_URL} ${FB_PIXEL_ID} ${DOMAIN}' < "$file" > "$file.tmp"
  mv "$file.tmp" "$file"
done

exec node server/index.js
