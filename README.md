## What is MERN-forms-auth-JWT?
This is application about forms inspired by Google Forms. You can get information about forms and get answers for them. You can also use drag & drop for changing order of questions in create/edit form. There is CRUD interface for both logged and unlogged user but only logged user can use additional functionalities such as create, edit or delete form. There are register and login mechanisms and JWT authentication (authentication is also possible via Google). App is responsive and implements RWD.

## About project:
This is a project for practice either backend or frontend skills made in my free time.

## Used technology:
* frontend: 
  * React, Redux/Redux-Thunk 
  * Typescript
  * MaterialUI
  * Axios, JWT
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
 7. Run 'npm start' for both server and client side.

## Plans:
* Adding login functionality for admin who has CRUD interface for users
* Deploy App 

## Demo:
https://user-images.githubusercontent.com/43199382/129472915-716aefb1-0121-41e5-a0af-f8c45d9157ce.mp4

## Screenshots:
![1](https://user-images.githubusercontent.com/43199382/129473129-d5a7c7c9-f31e-4a63-96aa-1750c2a63a4e.jpg)
![2](https://user-images.githubusercontent.com/43199382/129473132-04cb4487-1006-4578-a4be-27b76a44dae7.jpg)
![3](https://user-images.githubusercontent.com/43199382/129473133-8d7c9871-8132-438d-bfaf-dec142f80205.jpg)
![4](https://user-images.githubusercontent.com/43199382/129473134-d50553ab-73ea-4c75-bc41-c72d708902ec.jpg)

