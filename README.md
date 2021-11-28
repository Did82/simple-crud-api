# simple-crud-api

RSS Task 3: simple-crud-api.

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To create and run a production build:

```sh
npm run start:prod
```

To run in development mode (nodemon is required):

```sh
npm run start:dev
```

## API path ```/person```:

GET `/person` or `/person/${personId}` return all persons or person with corresponding personId

POST `/person` is used to create record about new person and store it in database

PUT `/person/${personId}` is used to update record about existing person

DELETE `/person/${personId}` is used to delete record about existing person from database

## Persons are stored as objects that have following properties:

id — unique identifier (string, uuid) generated on server side

name — person's name (string, required)

age — person's age (number, required)

hobbies — person's hobbies (array of strings or empty array, required)
