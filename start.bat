REM Starting Mongo DB
 start cmd /k mongod --dbpath=C:\Workbench\MongoData\

REM Starting Backend Microservice
start cmd /k "cd /d %~dp0metallica-notification-service && npm i && npm start"
start cmd /k "cd /d %~dp0metallica-oauth-service && npm i && npm start"
start cmd /k "cd /d %~dp0metallica-trade-service && npm i && npm start"
start cmd /k "cd /d %~dp0metallica-reference-data-service && npm i && npm start"
start cmd /k "cd /d %~dp0metallica-marketData-service && npm i && npm start"

REM Starting Backend APIGateway
start cmd /k "cd /d %~dp0metallica-apigateway && npm i && npm start"

REM Starting GUI/WEB Server
start cmd /k "cd /d %~dp0metallica-ui && npm i && npm start