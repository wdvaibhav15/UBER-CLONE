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

## `POST /captains/register`

Registers a new captain in the system.

### Description
Creates a new captain record using the provided full name, email, password, and vehicle information. The endpoint validates the request body, hashes the password, saves the captain data, and returns the created captain object.

### Request URL
`/captains/register`

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
- `vehicle` (object, required)
  - `color` (string, required)
    - Minimum length: 3 characters.
  - `plate` (string, required)
    - Minimum length: 3 characters.
  - `capacity` (integer, required)
    - Must be a positive integer.
  - `vehicleType` (string, required)
    - Must be one of: `car`, `motorcycle`, `auto`.

### Example Request Body
```jsonc
{
  "fullname": {
    "firstname": "Jane",               // required, min 3 chars
    "lastname": "Doe"                 // optional
  },
  "email": "captain@example.com",     // required, valid email
  "password": "securePassword123",    // required, min 6 chars
  "vehicle": {
    "color": "Blue",                  // required, min 3 chars
    "plate": "ABC123",                // required, min 3 chars
    "capacity": 4,                      // required, positive integer
    "vehicleType": "car"              // required, one of: car, motorcycle, auto
  }
}
```

### Successful Response

- Status: `201 Created`
- Body: JSON object containing the created captain.

### Example Successful Response
```jsonc
{
  "captain": {
    "_id": "64b7f2e12345abcde6789012",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."  // JWT token for auth
}
```

### Error Responses

- Status: `400 Bad Request`
  - Returned when validation fails (invalid email, missing fields, invalid vehicle data, or captain already exists).
- Status: `500 Internal Server Error`
  - Returned when an unexpected error occurs on the server.
