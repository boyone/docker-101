FROM node:16.20.0-alpine3.17 as build-stage
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --force
COPY . .
ENV VITE_APP_END_POINT=http://localhost/api/v1/hello
RUN yarn build 

FROM nginx:1.23-alpine3.17
RUN apk update && apk add --no-cache tzdata
ENV TZ="Asia/Bangkok"
RUN mkdir -p /usr/share/nginx/html
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
