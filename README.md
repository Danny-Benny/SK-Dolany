## Setup db

1. `docker run -it --name sk-dolany-db -d -p 7501:5432 -v "$(pwd)/db-container-data/:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=Zedobrazkolecko1234 -e POSTGRES_USER=postgres -e POSTGRES_DB=skdolany -e PGDATA=/var/lib/postgresql/data/pgdata postgres:16.0-alpine` (on Windows replace `pwd` with `pwd -W`)
2. Connect to the db and run commands inside `./server/database.sql`

# Deployment

1. `./pre-publish.sh`
2. `scp -r ./* root@49.12.186.191:/root/app`
3. Connect to the server using ssh (`ssh root@49.12.186.191`) and execute following commands
4. `cd /root/app && chmod +x ./publish.sh && ./publish.sh`

# Deployment - db

1. Run normal db setup command
2. `sudo docker exec -it sk-dolany-db /bin/bash`
3. `psql -d skdolany -p 5432 -U postgres`
4. Copy and paste commands from `./server/database.sql`
