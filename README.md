# ChefSkills REST API

This is the backend API used for the ChefSkills application. ChefSkills is a directory of Culinary Arts training locations.

### Prerequisites

You must create an account and get access to a location service API. I would recommended MapQuest API:

```
https://developer.mapquest.com/
```

You must create a config file with your environment variables.

1. Create a new file: config/config.env

2. Add variables

```
NODE_ENV=YOUR_ENV
PORT=YOUR_PORT

MONGO_URI=YOUR_MONGO_URI

GEOCODER_PROVIDER=YOUR_PROVIDER
GEOCODER_API_KEY=YOUR_API_KEY

FILE_UPLOAD_PATH= public/upload/path
MAX_FILE_UPLOAD= 1000000

JWT_SECRET=YOUR_SECRET
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```

## Installation

1. Install dependencies in main project folder.

```
npm install
```

## Running the servers

1. Start nodemon dev server.

```
npm run dev
```

## Screenshots

![Coming](https://upload.wikimedia.org/wikipedia/commons/8/80/Comingsoon.png "Coming Soon")

## Built With

- JavaScript
- NodeJS
- ExpressJS
- MongoDB
- Postman
- VSCode

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
