# **Wadaq RESTful Api for school management system**

## Tech Stack

**Server:** Node, Express, MongoDB, Mongoose, JWT

**Modules:** bcryptjs,express-validator,helmet,hpp,compression,hpp,toobusy-js,xss-clean

# API FEATURES

- Authentication & Authorization
- CRUD operations
- Routes Protection
- Subjects
- ClassLevels
- AcademicYear
- AcademicTerm
- YearGroups
- Exams
- Questions
- Programs
- Logged Users (Admin,Teacher,Student)
- Permissions (Admin,Teacher,Student)
- Log out if the password is changed
- Search
- Pagination
- More to explore!

## Run Locally

Clone the project

```bash
  git clone https://github.com/aashahin/Wadaq-RESTful-API-LMS.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```

## Environment Variables

To run this project, you will need to add the following environment variables to your config.env file

# Server Settings

```
PORT=5000

NODE_ENV=development

BASE_URL=https://example.com
```

# Database

```
MONGO_URL=mongodb://localhost:0000/ecommerces
```

# JWT

```
SECRET_KEY='as#ewronh$%@65*-'
EXPIRESIN=90d
```

# API Authentication

Some endpoints may require authentication for example. To create a create/delete/update, you need to register your API client and obtain an access token.

The endpoints that require authentication expect a bearer token sent in the `Authorization header`.

**Example**:

`Authorization: Bearer YOUR TOKEN`

## Register a new API client

```http
POST /api/v1/auth/staff/admin/signup
```

The request body needs to be in JSON format.

# **Examples**

## **User Login**

```http
POST /api/v1/staff/admin/login
```

| Parameter        | Type     | Description   | Required |
| :--------------- | :------- | :------------ | :------- |
| `authentication` | `string` | Your token    | no       |
| `email`          | `string` | Your email    | yes      |
| `password`       | `string` | Your password | yes      |


## **[View on Postman](https://www.postman.com/orbital-module-geologist-396425/workspace/wadaq-school-management-system)**

[![Logo](https://pub-ebc3292441104a07b54e254192a1b246.r2.dev/icons8-postman-is-the-only-complete-api-development-environment-96.png)](https://www.postman.com/orbital-module-geologist-396425/workspace/wadaq-school-management-system)
