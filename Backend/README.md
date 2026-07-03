# Backend API Documentation

## `POST /users/register`

Registers a new user in the system.

### Description

Creates a new user account using the provided email, full name, and password. The endpoint validates the request body, hashes the password, saves the user data, and returns the created user object along with an authentication token.

### Request URL

`/users/register`

### Method

`POST`

### Request Body

The request body must be JSON and include the following fields:


- `fullname` (object, required)
  - `firstname` (string, required)
    - Minimum length: 3 characters.
  - `lastname` (string, optional)
- `email` (string, required)
  - Must be a valid email address.
- `password` (string, required)
  - Minimum length: 6 characters.

### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Successful Response

- Status: `201 Created`
- Body: JSON object containing the created user and an authentication token.

### Error Responses

- Status: `400 Bad Request`
  - Returned when validation fails (invalid email, missing fields, or password too short).
- Status: `500 Internal Server Error`
  - Returned when an unexpected error occurs on the server.

## `POST /users/login`

Logs in an existing user and returns an authentication token.

### Description
Authenticates a user using email and password. Verifies the password against the stored hash and returns a JWT token for the authenticated session.

### Request URL
`/users/login`

### Method
`POST`

### Request Body
The request body must be JSON and include the following fields:

- `email` (string, required)
  - Must be a valid email address.
- `password` (string, required)
  - Minimum length: 6 characters.

### Example Request Body
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Successful Response

- Status: `200 OK`
- Body: JSON object containing the authenticated user and an authentication token.

### Error Responses

- Status: `400 Bad Request`
  - Returned when validation fails (invalid email, missing fields, or password too short).
- Status: `401 Unauthorized`
  - Returned when email or password is incorrect.
- Status: `500 Internal Server Error`
  - Returned when an unexpected error occurs on the server.

### Notes

- The password is compared to the stored hash before authentication.
- The returned user object should not include the password field.
- The token is generated using the user's `_id` and `JWT_SECRET` environment variable.

## `GET /users/profile`

Returns the authenticated user's profile data.

### Description
Retrieves the currently logged-in user's profile information using the active authentication token.

### Request URL
`/users/profile`

### Method
`GET`

### Authentication
Requires a valid JWT token, typically sent in an HTTP cookie or the `Authorization` header.

### Successful Response

- Status: `200 OK`
- Body: JSON object containing the authenticated user's profile.

### Error Responses

- Status: `401 Unauthorized`
  - Returned when no valid authentication token is provided.
- Status: `500 Internal Server Error`
  - Returned when an unexpected error occurs on the server.

## `GET /users/logout`

Logs out the authenticated user and blacklists the current JWT token.

### Description
Clears the authentication cookie and saves the current token in a blacklist so it cannot be reused.

### Request URL
`/users/logout`

### Method
`GET`

### Authentication
Requires a valid JWT token, typically sent in an HTTP cookie or the `Authorization` header.

### Successful Response

- Status: `200 OK`
- Body: JSON object with a logout confirmation message.

### Error Responses

- Status: `401 Unauthorized`
  - Returned when no valid authentication token is provided.
- Status: `500 Internal Server Error`
  - Returned when an unexpected error occurs on the server.
