#!/bin/bash

# make migration file
docker-compose -f docker-compose.yml -f docker-compose-migration.yml up -d web maria
docker-compose -f docker-compose.yml -f docker-compose-migration.yml exec web /bin/sh -c 'npm run migration:generate -- -c development_write'
docker-compose -f docker-compose.yml -f docker-compose-migration.yml down
