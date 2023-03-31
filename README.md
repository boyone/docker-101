# Topics

1. Docker?

   - What is Container?
   - Language Flexibility

     service A(jdk8), service B(jdk7), service C(go1.9)

   - Isolation Without Overhead

     light weight

   - Developer Efficiency

     Isolating Dependencies(libs, configuration)

   - Reproducibility

     Containers make it easier to reproduce your application environment.

2. Getting Start

   - Install Docker and Editor
     1. [get-docker](https://docs.docker.com/get-docker/)
     2. [install windows home](https://docs.docker.com/docker-for-windows/install-windows-home/)  
        [WSL2](https://docs.docker.com/docker-for-windows/wsl/) must be installed before you can install and use Docker.
     3. Install VSCode & Docker Plugin
   - Hello World Docker

     ```sh
     docker run hello-world
     ```

   - Docker run: behind the scenes

     - Docker looks for the image on this computer
     - Is it installed
     - Docker searches Docker Hub for the image.
     - Is it on Docker Hub
     - Docker downloads the image
     - The image layers are installed on the computer
     - Docker create a new container and starts the program.
     - The container is running.

3. Docker Commands

   - Basic Commands: run, ls, rm, ps, start, stop, help
   - Docker Image: image
   - Docker Container: container

4. Docker Image

   1. [lab 01. Create Docker Image from Scratch](lab01-hello-world/README.md)

      - Web API
      - Modify, Commit, and Tag
      - Sign Up [https://hub.docker.com](https://hub.docker.com)
      - Push Image to hub.docker.com
      - Pull and Run
      - Bind port

   2. [lab 02. Create Docker Image from Dockerfile](lab02-create-docker-image-by-Dockerfile/README.md)

      - [Reference](https://docs.docker.com/engine/reference/builder/)
        - FROM, COPY, RUN, CMD, ENTRYPOINT
      - [Dockerfile best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
      - Pull and Run
      - Bind port

   3. Create Docker Image for Node and ReactJs
   4. Create Docker Image for Nginx and Embedded Static files

5. Docker Network

   1. Running Frontend and Backend Service without docker-compose

      > [lab 03. Communicate via Host Network](lab03-communicate-to-other-containers-via-host-network/README.md)

      - Hello, World API 0.0.1
      - My Alpine

6. Docker Compose(intro) =================================

   - docker compose version

   > [lab 04. Start Http API Service via docker-compose](lab04-working-with-api/README.md)

   - One service(Store Service)
   - Command: Up/Down
   - Option: --build --force-recreate ===============================

7. Study the web application architecture
8. Analysis and design how to use docker
9. Define the implementation steps of using docker
   > [lab 05. Docker Compose and Reverse Proxy with Nginx](lab05-docker-compose-and-Dockerfile/README.md)
   - Define ReactJs App Endpoint
   - Define Nginx Upstream
   - Define Nginx Root Context
   - Define Nginx Location
