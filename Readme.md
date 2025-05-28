
# IMF Gadget API Documentation

## Overview

**Version:** 1.0.0  
**Description:** API for managing IMF gadgets.

---

## Authentication

All secured endpoints use **Bearer Token (JWT)** in the `Authorization` header.

```http
Authorization: Bearer <your_token_here>
```

---

## Endpoints

### 🔐 Auth

#### `POST /auth/register`

**Register a new user**

- **Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

- **Response:**
  - `201 Created`: User registered

---

#### `POST /auth/login`

**Login and get JWT token**

- **Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

- **Response:**
  - `200 OK`: JWT token returned

---

### 🛠️ Gadgets

#### `GET /gadgets`

**Get all gadgets**  
**Security:** Bearer Token

- **Response:**
  - `200 OK`: List of gadgets

---

#### `POST /gadgets`

**Create a new gadget**  
**Security:** Bearer Token

- **Response:**
  - `201 Created`: Gadget created

---

#### `PATCH /gadgets/{id}`

**Update a gadget**  
**Security:** Bearer Token

- **Path Parameter:**
  - `id` (string) – Gadget ID

- **Request Body:**

```json
{
  "name": "string",
  "status": "Available | Deployed | Destroyed | Decommissioned"
}
```

- **Response:**
  - `200 OK`: Gadget updated

---

#### `DELETE /gadgets/{id}`

**Decommission a gadget (soft delete)**  
**Security:** Bearer Token

- **Path Parameter:**
  - `id` (string) – Gadget ID

- **Response:**
  - `200 OK`: Gadget decommissioned

---

#### `POST /gadgets/{id}/self-destruct`

**Trigger gadget self-destruct**  
**Security:** Bearer Token

- **Path Parameter:**
  - `id` (string) – Gadget ID

- **Response:**
  - `200 OK`: Self-destruct triggered

---

#### `GET /gadgets/filter`

**Get gadgets by status**  
**Security:** Bearer Token

- **Query Parameter:**
  - `status` (string)

- **Response:**
  - `200 OK`: List of gadgets by status

---

## Security Schemes

### `bearerAuth`

- **Type:** HTTP
- **Scheme:** bearer
- **Format:** JWT