Development environment with docker
========================

This repo shows a development environment with docker where docker-compose is used to start up container from images that are built using the Dockerfiles in the `.docker/` directory.

When the images are built, some parts are moved into the image.

When the container are run, the local files are mounted as volumes onto the containers.

You can then edit the files locally, and access the changes from within each container.

The aim is to include the complete development environment within the repo so the developer only need to start it up using docker and no extra software needs to be installed on the local system.

[[_TOC_]]



Get going
------------------------

You need to have docker and docker-compose installed on your system.

After you have cloned this repo, you can move into it and start a container just to see that it works.

```
$ docker-compose run node bash
root@40f1f4b78b1a:/app# node --version
v18.12.0
```



docker-compose node, node_http, node_json
------------------------

The file `docker-compose_node.yml` contains a set of node related containers.

* `node` - to run scripts within.
* `node_http` - a webserver serving pages from `public/`.
* `node_json` - a sample REST server working on the dataset in `data/db.json`.

You can start all servers with one command.

```
docker-compose -f docker-compose_node.yml up

# or using detached mode -d
docker-compose -f docker-compose_node.yml up -d
```

You can try it out by starting the node container and accessing teh webserver from that.

Start the node container.

```
docker-compose -f docker-compose_node.yml run node bash
```

Access a webpage on the running container `node_http`.

```
curl http://node_http:9180/page.html
```

The docker-file used to build the images are located in the `.docker/{node,node_http.node_json}/Dockerfile`.



<!--
* Elastic search
* Redis
* MongoDB
* GraphQL
* Debian

docker-compose run php
------------------------



docker-compose run python
------------------------



docker-compose run java
------------------------



docker-compose run csharp
------------------------
-->


docker-compose up mariadb / mysql
------------------------

The images for MariaDB and MySQL are setup in the same way. The database is stored in a persistent volume which migh be initiatet from SQL-files in the directory `.docker/[mariadb,mysql]/sql.q/`.

Thes images are not built so the default images from Docker hub are used.

Start each image and the database is visible from the port 3306, as configured in `docker-compose.yml`. The configuration is setup so both containers uses the same port so they can not run at the same time.

```
docker-compose up mariadb
docker-compose up mysql
```

You can remove the volumes completly, to restart from scratch, using the following command.

```
docker-compose down -v
```



docker-compose up mongo
------------------------

This is how you start up the MongoDB container.

```
docker-compose up mongo
```

You can take it down, with or without cleaning up the volume. 

```
docker-compose down

# or remove the volume (database) and start over from scratch
docker-compose down -v
```

The database MongoDB listens on its default port 27017 when you start it in the container.

You can connect to the running database by opening up another container and starting the MongoDB Shell in it.

```
# Run a shell in the container
docker-compose run mongo bash
```

Then connect to the database as an anonymous or authenticated user.

```
mongosh mongodb://mongo

# Connect as authenticated user with password
mongosh mongodb://root:secret@mongo
```



docker-compose up nginx
------------------------

The image `nginx` is the web server Nginx to host the static website available in your directory `public/`.

You can build and try out the image like this.

```
docker-compose up nginx
```

Open a web browser to `http://localhost:9080/` to display the website you have in your directory `public/`.

The files used to build the image is located in the `.docker/nginx/`.

When the container is started, the rules in the `docker-compose.yml` applies to what part of the repo is mounted into the container and what parts are not.

<!--
Use nginx as frontend to many of the other services and one image to access the various services through nginx.
-->


<!--
docker-compose up apache
------------------------

To be added.
-->