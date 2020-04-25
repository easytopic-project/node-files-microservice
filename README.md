# Node Files Microservice

Files Microservice, that handles upload and download of files using HTTP

## Installation

```bash
npm install
npm run build
npm start
```

You can also run `npm run dev` for development mode.

Alternatively, you can use the Docker version. To start an quick server just run `docker-compose up`

You need to pass as an ENV settings the following (check [src/env.js](src/env.js)): 

- `FILES_PATH`: Directory where the files will be stored. Default: `/files`
- `PORT`: Port where the application will run. Default: `3000`

## Routes

The following routes are available on the application:

- `/files`
  - POST: Store new files, multiple can be passed in multiple POST fields.
- `/files/:file`
  - GET: Retrieve an stored file by its name. 
  - DELETE: Delete an stored file.

