## Setup db

1. `docker run -it --name sk-dolany-db -d -p 7501:5432 -v "$(pwd)/db-container-data/:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=Zedobrazkolecko1234 -e POSTGRES_USER=postgres -e POSTGRES_DB=skdolany -e PGDATA=/var/lib/postgresql/data/pgdata postgres:16.0-alpine` (on Windows replace `pwd` with `pwd -W`)
2. Connect to the db and run commands inside `./server/database.sql`
