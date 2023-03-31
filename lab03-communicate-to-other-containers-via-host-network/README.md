# Docker Network 101

## Build Hello-API

```sh
# hello
cd hello
docker build -t hello-api:0.0.1 .
```

## Via Host (Without Docker Compose)

```sh
docker container run -d --rm -p 5229:5229 --name hello hello-api:0.0.1
```

```sh
# List running containers
docker container ls
```

```sh
ifconfig
```

```sh
docker container run -it --rm my-alpine
```

```sh
curl http://<IP>:5229/api/v1/hello
```

```sh
docker container rm -f  `docker container ls -aq`
docker container rm -f  $(docker container ls -aq)
```

## Via Docker Network ==============================

```sh
docker network
```

```sh
docker network create mynetwork
```

```sh
docker container run -d --rm -p 5229:5229 --network mynetwork --name hello hello-api:0.0.1
```

```sh
docker container run -it  --network mynetwork --rm my-alpine
```

```sh
curl http://hello:5229/api/v1/hello
```

```sh
docker network rm mynetwork
```

```sh
docker network prune
```