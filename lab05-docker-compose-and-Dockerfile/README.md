# Docker Compose and Reverse Proxy with Nginx

## Define ReactJs App Endpoint

```jsx
// App.jsx
const endPoint =
  import.meta.env.VITE_APP_END_POINT || 'http://localhost:5229/api/v1/hello';
```

```dockerfile
ENV VITE_APP_END_POINT=http://localhost/api/v1/hello
RUN yarn build
```

## Define Nginx Upstream

```conf
upstream hello-api {
    server hello-api:5229;
}
```

## Define Nginx Root Context

```conf
root /usr/share/nginx/html/;
```

## Define Nginx Location

```conf
location /api {
    proxy_pass http://hello-api;
    proxy_redirect     off;
    proxy_set_header   Host $host;
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Host $server_name;
}

location / {
    try_files $uri /index.html;
}
```

## Docker Compose Commands

```sh
docker-compose up
```

```sh
docker-compose up -d
```

```sh
docker-compose up --build --force-recreate
```
