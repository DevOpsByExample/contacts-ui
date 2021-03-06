FROM node:12.10 as source
WORKDIR /src/contacts-ui
COPY ./package.json ./
RUN npm install --production
COPY . ./
RUN npm run build

FROM nginx:1.17
WORKDIR /opt/contacts-ui
COPY --from=source /src/contacts-ui/build .
COPY default.template /etc/nginx/conf.d/default.template
CMD ["/bin/bash", "-c", "envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
