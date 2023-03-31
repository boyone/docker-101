# Hello, World

```sh
docker run hello-world
```

```sh
docker container run hello-world
```

```sh
docker image ls
```

```sh
docker container ls -a
```

## Run with -d

```sh
docker container run boyone/hello-world
```

```sh
docker container run -d boyone/hello-world
```

```sh
docker container ls
```

```sh
docker container logs <container id| container name>
```

```sh
docker container logs -f <container id| container name>
```

## Start, Stop, and Remove Containers

```sh
docker container stop <container id| container name>
```

```sh
docker container start <container id| container name>
```

```sh
docker container rm <container id| container name>
```

```sh
docker container prune
```

## Create Your Own Image(Manual) 2 Options ==================================

1. build on local machine

   - dotnet build
   - dotnet publish
   - run docker
   - copy publish to container
   - exec \*.dll inside container
   - docker commit

2. build inside container

   - run docker with -v option
   - switch to run command inside docker container(dotnet sdk)

     ```sh
     docker container run -it --rm -v `pwd`/api:/src mcr.microsoft.com/dotnet/sdk:6.0-focal
     ```

   - exec `dotnet build`, `dotnet publish`
   - exit docker container
   - exec copy `publish/` to target directory

     ```sh
     docker container run -it -d -p 5229:5229 --name aspnet mcr.microsoft.com/dotnet/aspnet:6.0-focal
     docker container exec aspnet mkdir -p /app/publish
     docker container cp /Users/boyone/workspaces/sck/docker-101/demo/hello/api/bin/Debug/net6.0/publish aspnet:/app
     ```

   - test start dotnet app

     ```sh
     docker container exec -it aspnet bash
     cd /app/publish
     ASPNETCORE_URLS=http://+:5229 dotnet api.dll &
     exit
     ```

   - commit docker image

     ```sh
     docker container commit aspnet myaspnet
     docker image ls
     ```

   - stop and remove container

     ```sh
     docker container stop aspnet
     docker container rm aspnet
     ```

   - run docker myaspnet image

     ```sh
     docker container run -it -d -p 5229:5229 -e ASPNETCORE_URLS=http://+:5229 myaspnet dotnet /app/publish/api.dll
     docker container run -d --rm -p 5229:5229 -e ASPNETCORE_URLS=http://+:5229 --name myasp myaspnet dotnet /app/publish/api.dll
     ```

3. dotnet sdk vs runtime
4. dotnet base images

## Run Your Own Images

```sh
docker container run image_name
```

## Image Versioning

- tag
- latest
- username/hello-world:0.0.1
- username/hello-world:0.0.2

## Push Your Own Images to Docker Hub

- Sign Up [https://hub.docker.com](https://hub.docker.com)
- Login

```sh
docker login
```

- Push Image to hub.docker.com

```sh
docker image push username/image_name:tag
```

## Remove All Images

```sh
docker image rm image_name
```

## Custom Alpine

```sh
docker pull alpine:3.17

docker container run -d -it --name alpine alpine:3.17
docker container exec alpine sh

docker container run -it --name alpine alpine:3.17

apk add curl

docker container commit alpine my-alpine

docker container run -it --rm alpine:3.17
```
