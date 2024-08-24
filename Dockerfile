FROM node:22-alpine3.19

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN apk update

RUN apk add --no-cache curl

RUN addgroup -S -g 1001 nodejs \
    && adduser -S -u 1001 -G nodejs appuser \
    && chown appuser /app \
    && chown appuser /app/uploads 

USER appuser 

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl", "-f", "http://localhost:5000/health" ]

EXPOSE 5000

CMD ["npm", "run", "start"]