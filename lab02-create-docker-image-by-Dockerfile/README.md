# Create Docker Image by Dockerfile

Dockerfile is a text file that contains instructions for building an image.

## Build image by copy binary to Dockerfile

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal AS base
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:5229

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
WORKDIR /src
COPY ["api.csproj", "./"]
RUN dotnet restore "api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
ENV TZ="Asia/Bangkok"
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "api.dll"]
```

```sh
docker build -t myaspnet2 .
```

```sh
docker image ls
```

## Run Your Own Image

```sh
# exercise run myaspnet2 
```

## Docker Image for Node and ReactJs

```dockerfile
ARG NODE_VERSION=16.17.0
ARG VITE_MODE=development

# Build
FROM node:${NODE_VERSION} AS build
ARG VITE_MODE
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn/ ./.yarn/
RUN yarn install
COPY . .
RUN echo "VITE_MODE: $VITE_MODE"
# RUN npx vite build --mode ${VITE_MODE} --base /trip
RUN npx vite build --mode ${VITE_MODE} --base /trip

# Runtime
FROM node:${NODE_VERSION}-slim AS runtime
ENV NODE_ENV=production
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
WORKDIR /usr/dist
RUN npm install -g http-server
COPY --from=build /usr/src/app/dist .
# Run server on 'node' user (Non-root user)
# See https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
RUN chown -R node /usr/dist
USER node
EXPOSE 8080
CMD ["http-server", ".", "-p", "8080", "-d", "false"]
```

## Docker Image for Nginx and Embedded Static files

```dockerfile
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
```
