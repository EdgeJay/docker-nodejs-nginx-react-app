FROM node:12.16.1-alpine as client

WORKDIR /var/www/client

COPY ./packages/client .

RUN yarn install
RUN yarn run build

FROM nginx:alpine as release

COPY --from=client /var/www/client/build /var/www/dnnra

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf