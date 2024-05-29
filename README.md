## How to run this project

Requirements:
- Docker version 20.10.22, build 3a2c30b
- Npm 10.5.0
- Node 20.12.0

1. First step
You shoud have install Docker and run the following command:
docker compose --env-file ./api/.env up

You should wait like 40 seconds until the seeder is completed because it has to wait the database

2. Run the app

just go to /app folder and run `npm install` and run `npm run dev`


3. In both folder if you want to run the test 
Just run `npm run test`
