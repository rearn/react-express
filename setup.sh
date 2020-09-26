#!/bin/bash

# build
docker run -d --volume="$(pwd):/mnt" --user="1000:1000" -w="/mnt" --name="setup" -it node:lts-alpine3.11 /bin/sh
docker exec -it setup /bin/sh -c 'npm install'
docker stop setup
docker rm setup

# migration
docker-compose -f docker-compose.yml -f docker-compose-migration.yml up -d web maria
docker-compose -f docker-compose.yml -f docker-compose-migration.yml exec web /bin/sh -c 'npm run migration:run'
docker-compose -f docker-compose.yml -f docker-compose-migration.yml down

# # make migration file
# docker-compose -f docker-compose.yml -f docker-compose-migration.yml up -d cron
# docker-compose -f docker-compose.yml -f docker-compose-migration.yml exec cron /bin/sh -c 'npm run migration:generate'
# docker-compose -f docker-compose.yml -f docker-compose-migration.yml down
