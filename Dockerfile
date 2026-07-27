FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate && npm run build

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY scripts/docker-start.sh /docker-start.sh
RUN sed -i 's/\r$//' /docker-start.sh && chmod +x /docker-start.sh

EXPOSE 3000
CMD ["/docker-start.sh"]
