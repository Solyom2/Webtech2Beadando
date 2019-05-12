#!/bin/bash

# Create and Run a MongoDB Server in a Docker Container
# MongoDB contains the Sakila Template DB
#
# The initialized Sakila DB will always be at the same starting state.
# You can modify it but these modification will lost when you stop the container.
# The container is used to provide a reliable fix database for applicaiton development.
# So you can focus on the the used technologies and should not concern about the initialization and populating of the database.
#
# See more about the Sakila Template and its Mongo Version:
#	- https://dev.mysql.com/doc/sakila/en/
#	- http://guyharrison.squarespace.com/blog/2015/3/23/sakila-sample-schema-in-mongodb.html
#	- https://medium.com/dbkoda/mongodb-sample-collections-52d6a7745908
#
# Created: 2019-05-01

# If these change, change app/config/mongoConfig too
MONGO_HOST_IP=172.21.0.10
MONGO_NETWORK_MASK=172.21.0.0/16
MONGO_NETWORK_NAME=mongodb-network
MONGO_CONTAINER_NAME=mongodb-shutters

docker network create -d bridge --subnet $MONGO_NETWORK_MASK $MONGO_NETWORK_NAME

docker stop $MONGO_CONTAINER_NAME
docker rm $MONGO_CONTAINER_NAME
docker run --detach --name $MONGO_CONTAINER_NAME --network $MONGO_NETWORK_NAME --ip $MONGO_HOST_IP mongo

chmod +r *.json

mongoimport --host $MONGO_HOST_IP --db shuttershop --collection orders orders.json

mongo --host $MONGO_HOST_IP