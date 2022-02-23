#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE nest-pg-example;
    GRANT ALL PRIVILEGES ON DATABASE nest-pg-example TO docker;
EOSQL
