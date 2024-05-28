# CR Management Application

This is a web application for managing and organizing code reviews on GitHub. The backend is built with Node.js, Express, MongoDB, and TypeScript, utilizing Mongoose for MongoDB management. The application supports user authentication, version release management, pull request assignment, and status tracking.

## Table of Contents

- [CR Management Application](#cr-management-application)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [API Document](#api-document)
    - [User Endpoints](#user-endpoints)
    - [Pull Request Endpoints](#pull-request-endpoints)
    - [Release Endpoints](#release-endpoints)
    - [Authentication Endpoints](#authentication-endpoints)
  - [Authentication Middleware](#authentication-middleware)
    - [auth.middleware.ts](#authmiddlewarets)
  - [Starting the Server](#starting-the-server)
  - [License](#license)

## Features

- User authentication with JWT
- Create and manage version releases
- Assign pull requests to reviewers
- Track pull request status and issues
- Protected routes to ensure only authenticated users can access certain endpoints

## Project Structure

```
├── src/
│   ├── config/
│   ├── controllers/
│   ├── enums/
│   ├── interfaces/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   ├── index.ts
├── package.json
├── tsconfig.json
├── .env
├── .env.example
└── README.md
```

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/Ilchampo/cr-manager-back.git
   cd cr-manager-back
```

2. Install dependencies
```bash
    npm install
```

## Configuration

1. Create a .env file in the root directory with the following environment variables:
```text
    APP_PORT = 3000
    APP_CORS_ORIGINS = https://www.front-end.com
    APP_MONGO_USERNAME = mongo_username
    APP_MONGO_PASSWORD = mongo_pasword
    APP_MONGO_URI = mongodb+srv:$username:$password@url
```
**Note:** on APP_MONGO_URI, the username should be `$username` and password `$password` as there's an utility that builds the final URI and replaces those values.

2. Ensure your MongoDB Atlas connection string is correct and your JWT secret key is secure.

## API Document

### User Endpoints

Create User

	•	Method: POST
	•	URL: /api/users
	•	Params: Body { firstname, lastname, username, password }

Get All Users

	•	Method: GET
	•	URL: /api/users
	•	Params: None

Get User by ID

	•	Method: GET
	•	URL: /api/users/:userId
	•	Params: Params { userId }

Update User

	•	Method: PUT
	•	URL: /api/users/:userId
	•	Params: Params { userId }, Body { firstname, lastname, username }

Update User Password

	•	Method: PUT
	•	URL: /api/users/:userId/password
	•	Params: Params { userId }, Body { currentPassword, newPassword }

Delete User

	•	Method: DELETE
	•	URL: /api/users/:userId
	•	Params: Params { userId }


### Pull Request Endpoints

Create Pull Request

	•	Method: POST
	•	URL: /api/pullRequests
	•	Params: Body { ticket, github, developer, reviewers }

Get All Pull Requests

	•	Method: GET
	•	URL: /api/pullRequests
	•	Params: None

Get Pull Request by ID

	•	Method: GET
	•	URL: /api/pullRequests/:pullRequestId
	•	Params: Params { pullRequestId }

Update Pull Request Status

	•	Method: PUT
	•	URL: /api/pullRequests/:pullRequestId/status
	•	Params: Params { pullRequestId }, Body { status }

Update Pull Request Information

	•	Method: PUT
	•	URL: /api/pullRequests/:pullRequestId
	•	Params: Params { pullRequestId }, Body { ticket, github, reviewers, functionality, solid, sonarQube, jestTest, tdd, issuesFound, issues }

Delete Pull Request

	•	Method: DELETE
	•	URL: /api/pullRequests/:pullRequestId
	•	Params: Params { pullRequestId }

### Release Endpoints

Create Release

	•	Method: POST
	•	URL: /api/releases
	•	Params: Body { name, releaseDate, pullRequests }

Get All Releases

	•	Method: GET
	•	URL: /api/releases
	•	Params: None

Get Release by ID

	•	Method: GET
	•	URL: /api/releases/:releaseId
	•	Params: Params { releaseId }

Update Release Status

	•	Method: PUT
	•	URL: /api/releases/:releaseId/status
	•	Params: Params { releaseId }, Body { status }

Update Release Information

	•	Method: PUT
	•	URL: /api/releases/:releaseId
	•	Params: Params { releaseId }, Body { name, releaseDate, pullRequests }

Delete Release

	•	Method: DELETE
	•	URL: /api/releases/:releaseId
	•	Params: Params { releaseId }

### Authentication Endpoints

Login

	•	Method: POST
	•	URL: /api/auth/login
	•	Params: Body { username, password }

Logout

	•	Method: POST
	•	URL: /api/auth/logout
	•	Params: None

## Authentication Middleware

The authentication middleware verifies the JWT token to ensure that only logged-in users can access protected routes.

### auth.middleware.ts

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send({ message: 'Invalid token.' });
  }
};
```

## Starting the Server

To start the server, use the following command:

```bash
    npm start
```
The server will start and listen on the port specified in the .env file (default: 5000).

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

This README file provides a comprehensive overview of the application, including installation instructions, configuration details, API documentation, and information on how to start the server. If you have any additional requirements or specific details to include, feel free to let me know!