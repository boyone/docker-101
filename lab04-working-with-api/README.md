# Working with API

## Decare Docker Container via Docker Compose

```yml
version: "3"

services:
    hello-api:
      image: hello-api
      ports:
          - "5229:5229"

    my-alpine:
      image: my-alpine
      restart: always
      command: curl http://hello-api:5229/api/v1/hello
```

## Docker compose

```sh
docker-compose up
```

```sh
docker-compose -f docker-compose-build.yml up
```

```sh
docker-compose up -d
```

```sh
docker-compose down
```