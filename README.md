# Metallica

More Details : <LINK_TO_INTERNAL_VOX_PAGE>

The project is an attempt to develop end to end solution for Metallica Use Case. It contains nodeJS/Express based Microservices Services constructed using the REST Principles and standard industry practises. It also contains React JS based frontend GUI.

## NodeJs Backend Server

The major packages used for backend server are:

- express - for creating nodeJS based server which hosts the APIs
- mongoose - for mongoDb handling
- cote - For Services Discovery & Registration

Its being assumed that MongoDb server is running locally at default port i.e. 27017. If not so,
Please change the connection properties in config.json, under the config folder in each appropriate service.

## Frontend

Frontend GUI is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To Start the project:

After Cloning/Downloading the project Follow the below steps:

1. **Run Backend Microservice server**

- For each service
- Run `cd <SERVICE_DIR_NAME>`
- Run `npm i`
- Run `npm start`

  Order of services is not of any concern, and can be start/stop in arbiratry manner. OAuth Service and RefData Service seeds respective mongo db databases.

  To login with test users use following credentials
  email: test<1-5>@test.com
  password: test123

2. **Run Frontend Project**

- Run `cd metallica-ui`
- Run `npm i`
- Run `npm start`

# OR

1. **Execute ./start.bat from root folder** and wait for few moments :)

To login use test credentials once and then for three day, you will be kept signed on
**email:** test<1-5>@test.com
**password:** test123
