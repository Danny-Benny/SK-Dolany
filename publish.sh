# client setup
cd client
rm -rf node_modules/ build/
npm i
npm run build
cd ..

# server start
cd server
rm -rf node_modules/ build/
npm i
npm run prod:stop
npm run prod:delete
npm run prod:start
cd ..