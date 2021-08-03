## What is MERN-Movies-with-Auth-JWT?
This is application about movies. You can get information about movies and their comments. there is CRUD interface for logged user. There are register and login mechanisms and JWT authentication.

## About project:
This is a project for practice either backend or frontend skills. The data for this project comes from dummy database from mongodb.com

## Used technology:
* frontend: 
  * React, Redux/Redux-Thunk 
  * Typescript
  * MaterialsUI
  * axios, JWT
* backend:
  * Node, Express.js
  * MongoDB, mongoose
  * JWT

## How to run app:
1. Download repo
2. go either to client folder and server folder and run 'npm install'
3. prepare .env file in the root of the server folder
4. paste CONNECTION_URL to mongoDB and JWT_SECRET for JWT authentication to .env file
5. For getting data from MongoDB you must first:
    * register and login to mongodb.com
    * create new project 
    * create new database user
    * add IP address (your local or 0.0.0.0/0)
    * copy connection string and put it to .env file (e.g. CONNECTION_URL = "<YOUR_CONNECTION_STRING>")
 6. Prepare secret key for JWT and put it to .env (e.g. JWT_SECRET = "<YOUR_SECRET>")

## Plans:
* Adding login functionality for admin who has CRUD interface for users
* Adding movie likes functionality
* Adding Comments functionality
* Deploy App 

## Demo:
https://user-images.githubusercontent.com/43199382/127380434-7ab3cf6d-44d2-4450-82dc-7914eaa92eb4.mp4

## Screenshots:
![image1](https://user-images.githubusercontent.com/43199382/127380440-5eb753a3-32d2-4edc-9f10-e39b03b94396.jpg)
![image2](https://user-images.githubusercontent.com/43199382/127380441-b28707dc-1c0a-488d-942c-6d7847b35e66.jpg)
![image3](https://user-images.githubusercontent.com/43199382/127380445-85b1ebe0-12fa-4d37-8b76-cde08548e7df.jpg)

