# library-manager-api

A mock Library Management Backend API with Express.js. This repo is for personal practice purposses.

## To run API

`bash
npm start`

## Prerequisite (Run a PostgreSQL DB and update .env file accordingly otherwise run this)

`bash
docker run --name postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres`
