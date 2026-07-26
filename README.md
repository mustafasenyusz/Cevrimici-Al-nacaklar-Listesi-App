# Listora

> A mobile shopping-list app backed by a lightweight Express API and PostgreSQL.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

## Overview

Listora is a full-stack learning project for keeping a user-specific shopping list. I focused on a clean mobile flow while practicing API communication, account-based data filtering, parameterized SQL queries, and relational persistence.

## Features

- Register and sign in
- Restore the active user from local storage
- Add products with a name and quantity
- Fetch list entries for the signed-in user
- Show live item counts in the mobile interface
- Keep user data separated through database relationships

## Stack

| Layer | Technology |
| --- | --- |
| Mobile frontend | React Native, Expo, Expo Router |
| Language | TypeScript, JavaScript |
| API | Node.js, Express, CORS |
| Database | PostgreSQL, node-postgres |
| Local session | AsyncStorage |

## API surface

```text
POST /giris
POST /kayit
GET  /liste/:id
POST /liste-ekle
```

## Run locally

```bash
git clone https://github.com/mustafasenyusz/Listora.git
cd Listora
npm install
node database.js
npx expo start
```

Create the PostgreSQL database and tables, then update the local database connection and client API base URL.

## Engineering roadmap

- Add edit, complete, and delete operations
- Move secrets and URLs into environment configuration
- Add password hashing and API authentication
- Improve loading, offline, and error states
- Add database migrations and automated tests

This project reflects my direction clearly: frontend is my main strength, while Node.js, Express, and PostgreSQL are the areas I am actively developing.

## Developer

Built by [Mustafa Şenyüz](https://github.com/mustafasenyusz).
