# Tweet API

This is a simple Tweet API built using NestJS and MongoDB. It includes basic features such as user registration, login, tweeting, following users, viewing a feed, and logout functionality. The application uses JWT for authentication and provides a mechanism to blacklist tokens upon logout.

## Introduction
This project marks my first attempt at using NestJS with TypeScript. I am still learning the intricacies of these technologies, so there may be some errors or suboptimal practices in the code. I appreciate your understanding. The API has been manually tested using Postman to ensure its basic functionality.

## Features

- **User Registration**: Allows users to create an account using a unique username and password.
- **User Login**: Provides JWT token upon successful login for authentication.
- **Tweeting**: Users can post tweets.
- **Following/Unfollowing**: Users can follow or unfollow other users by their username.
- **Feed**: Displays tweets from users that the authenticated user is following, sorted by the most recent.
- **Logout**: Logs out the user by invalidating their JWT token using a blacklist mechanism.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB Atlas**: A fully managed cloud database service for MongoDB.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Token)**: For secure user authentication (60s expires).
- **bcrypt**: For hashing user passwords.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/NontapatB/backend-test.git
    cd backend-test
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory with the following content:

    ```plaintext
    DATABASE_URI=your_mongodb_connection_uri
    JWT_SECRET=your_jwt_secret
    ```

    Replace `your_mongodb_connection_uri` with your MongoDB connection string and `your_jwt_secret` with your desired JWT secret key or you can change settings in configuration.ts file
   
    ```plaintext
    database: {
      uri: process.env.DATABASE_URI || 'your_mongodb_connection_uri',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'your_jwt_secret',
    },
    ``` 

5. **Run the application**:
    ```bash
    npm run start:dev
    ```
    ```bash
    npm run start
    ```

    The server should now be running at `http://localhost:3000`.

## API Endpoints (Already Test By using Postman)

### Authentication

- **Register**: `POST /auth/register`
  - Request Body:
    ```json
    {
      "username": "exampleUser",
      "password": "examplePassword"
    }
    ```
  - Response:
    ```json
    {
      "_id": "userId",
      "username": "exampleUser",
      "password": "hashedPassword"
    }
    ```

- **Login**: `POST /auth/login`
  - Request Body:
    ```json
    {
      "username": "exampleUser",
      "password": "examplePassword"
    }
    ```
  - Response:
    ```json
    {
      "access_token": "jwt_token"
    }
    ```

- **Logout**: `POST /auth/logout`
  - Headers: 
    ```plaintext
    Authorization: Bearer <jwt_token>
    ```
  - Response:
    ```json
    {
      "message": "User logged out"
    }
    ```

### Tweets

- **Create Tweet**: `POST /tweets`
  - Headers: 
    ```plaintext
    Authorization: Bearer <jwt_token>
    ```
  - Request Body:
    ```json
    {
      "message": "This is a new tweet"
    }
    ```
  - Response:
    ```json
    {
      "_id": "tweetId",
      "message": "This is a new tweet",
      "userId": "userId",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    ```

### Users

- **Follow a User**: `POST /users/follow/:username`
  - Headers: 
    ```plaintext
    Authorization: Bearer <jwt_token>
    ```
  - Request Body:
    ```json
    {
      "followUsername": "exampleUser"
    }
    ```
  - Response:
    ```json
    {
      "message": "You are now following exampleUser"
    }
    ```

- **Unfollow a User**: `POST /users/unfollow/:username`
  - Headers: 
    ```plaintext
    Authorization: Bearer <jwt_token>
    ```
  - Request Body:
    ```json
    {
      "unfollowUsername": "exampleUser"
    }
    ```
  - Response:
    ```json
    {
      "message": "You have unfollowed exampleUser"
    }
    ```

### Feed

- **Get Feed**: `GET /feed`
  - Headers: 
    ```plaintext
    Authorization: Bearer <jwt_token>
    ```
  - Response:
    ```json
    [
      {
        "_id": "tweetId",
        "content": "This is a new tweet",
        "userId": "userId",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
    ```
