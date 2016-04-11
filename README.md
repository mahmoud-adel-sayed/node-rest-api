# Node REST Api
This is a simple NodeJS REST API

### Installation
1. You have to install [NodeJs](https://nodejs.org) first.
2. You have to install [MongoDB](https://www.mongodb.com/).
3. then download or clone the app.

### Run the application
1. open your CLI or terminal & change directory to project folder.
2. type ($ npm install) to install the app dependencies.
3. run the mongod server.
4. run the app by tying in the CLI ($ node server.js).
5. If you want to upload images we use AWS(amazon web services) S3 storage to store our images , so you have to set (AWS_ACCESS_KEY , AWS_SECRET_KEY) enviroment variables when you start the app and change bucket name from this file (config/aws.js) to your s3 bucket name , so instead of type ($ node server.js) in CLI you will type ($ AWS_ACCESS_KEY=youraccesskey AWS_SECRET_KEY=yoursecretkey node server.js).

### Authentication & Authorization
we use a simple HTTP Basic authentication and authorization on the api endpoints

### Rate limiting
We do not use rate limiting in the sample but for more security reasons you can make rate limiting on your api .

### App demo
The app demo hosted on heroku [mahmoud-adel-restapi.herokuapp.com](http://mahmoud-adel-restapi.herokuapp.com/) to interact with it look at the api endpoints in app/routes directory.
