FROM node:12.16.1 as base

WORKDIR /var/www/server

RUN apt-get update && apt-get install -y apt-transport-https ca-certificates yarn

COPY . .

RUN yarn install
RUN yarn run build

FROM node:12.16.1-alpine as release

WORKDIR /var/www/server

COPY --from=base /var/www/server/.env ./.env
COPY --from=base /var/www/server/dist ./dist
COPY --from=base /var/www/server/package.json ./package.json
COPY --from=base /var/www/server/yarn.lock ./yarn.lock

RUN yarn install --production

EXPOSE 3004

CMD ["node", "-r", "esm", "./dist/index.js"]
