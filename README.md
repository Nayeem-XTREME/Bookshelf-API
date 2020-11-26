# Bookshelf-API
API to integrate for a bookshelf management system

## Install and Run
Type `npm install` on the terminal to install all the node dependencies

After that, type `npm run dev` to start the node development server.

## Project Description: 
It is a book management system. Where users can authenticate. After signing in, users can add, edit, delete book info. Book list and details can be seen publicly.
#### User authentication API
* Signup
* Login
#### Book management API
* Add book
* Edit book
* Delete book
* Get book list
* Get book details

## Usage
### User
#### Signup
To signup a new user send a `POST` request to the route `/user/signup` with the data as following JSON format:
``` 
{
  "name": "name",
  "email": "email",
  "password": "password",
  "mobile": "mobile"
} 
```
The `mobile` field is optional here.

#### Login
To login an existing user, send a `POST` request to route `/user/login` with the data as following JSON format:
```
{
  "email": "email",
  "password": "password"
}
```

For `SIGNUP` and `LOGIN`, both cases an `authentication token` is given to user, to authenticate a user for some operations.

#### Update
To update a user information, send a `PATCH` request to route `/user/update` with the necessary data to update as JSON format (same JSON format as `SIGNUP` request). The data can contain the following properties:
* name
* email
* password
* mobile

#### Fetch all existing user (OPTIONAL)
To view the list of registered user, send a `GET` request to the route `/users`. It will return the public profile information of the users.
