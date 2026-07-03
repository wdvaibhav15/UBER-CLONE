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

### Notes

- The password is hashed before being stored.
- The returned user object should not include the password field.
- The token is generated using the user's `_id` and `JWT_SECRET` environment variable.
