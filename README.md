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

#### Update (Authentication REQUIRED)
A logged in user can update his information. To update send a `PATCH` request to route `/user/update` with the necessary data to update as JSON format (same JSON format as `SIGNUP` request). The data can contain the following properties:
* name
* email
* password
* mobile

#### Fetch all existing user (OPTIONAL)
To view the list of registered user, send a `GET` request to the route `/users`. It will return the public profile information of the users.

#### Fetch the list of books of a user (Authentication REQUIRED)
To view the list of books of a user, send a `GET` request to the route `/user/books`. It will response with a book list of the logged in user.


### Book
#### Getting all book list
To fetch the full list of books, send a `GET` request to the route `/books`. It will response with the full book list.
> User can also pass some sorting queries to the `URL` to perform `sorting` on response data. In that case, send a `GET` request to the route `/books/?sortBy=<key>:<type>`. Replace the `<key>` with the `property name`, on which the search will execute based on. Also, replace `<type>` either with `asc` or `desc` keyword. `asc` is for assending sort and `desc` is for descending.

#### Fetch a specific book details
To fetch a specific book details, send a `GET` request to the route `/book/:id`. Here replace `:id` with the `ObjectID` of that specific book user want to fetch.

#### Add a new book (Authentication REQUIRED)
An existing user can add a new book into the collection. While logged in, send a `POST` request to the route `/book/add` with the data as following JSON format:
```
{
    "name": "book name",
    "author": "author",
    "publication": "publication",
    "year": "year of publication"
}

```
The `year` field is optional here.

#### Update a book information (Authentication REQUIRED)
A logged in user can update any of his book information. To update, send a `PATCH` request to route `/book/update/:id` with the necessary data to update as JSON format (same JSON format as `Add new book` request). The data can contain the following properties:
* name
* author
* publication
* year

#### Delete a book (Authentication REQUIRED)
A logged in user can delete any of his book. While logged in, send a `DELETE` request to the route `/book/delete/:id`, where `:id` is the `ObjectID` of that specific book user wants to delete. User will get the deleted book information in response.


## NOTE
* User can use [Postman](https://www.postman.com/) to test the `Bookshelf-API` until it's integrated into an app. 
* For `authentication` using [Postman](https://www.postman.com/), send the user authentication token in the request header as `Authorization: Bearer <token>` along with the request body. Replace `<token>` with the registered user token.
