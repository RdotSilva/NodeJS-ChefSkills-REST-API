# ChefSkills REST API

This is the backend API used for the ChefSkills application. ChefSkills is a directory of Culinary Arts training locations.

This project includes 32 unique API routes.

Fully secure user registration and login is included with password hashing and authentication using BCrypt and JWT.

Registered users can access and modify kitchen locations, courses and reviews. Admin accounts have full privileges.

Data is being stored on the cloud using MongoDB Atlas.

This project also includes full API documentation located on the homepage.

Postman Collection also provides additional documentation for the API and can be used for testing all API routes.

Live Demo hosted using Amazon Web Services (AWS): http://chefskillsapi.com

Postman Collection: https://documenter.getpostman.com/view/7246128/SW7c37ZU

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

SMTP_HOST=MAIL_HOST
SMTP_PORT=PORT
SMTP_EMAIL=EMAIL_KEY
SMTP_PASSWORD=PASSWORD
FROM_EMAIL=YOUR_EMAIL_ADDRESS
FROM_NAME=YOUR_NAME
```

## Installation

1. Install dependencies in main project folder.

```
npm install
```

## Running the servers

Start nodemon development server.

```
npm run dev
```

Start production server.

```
npm start
```

## Database Seeder

There is a database seeder included. This allows you to seed the database with users, kitchens, courses and reviews with the json data files located inside of the \_data folder.

1. Add your data into the \_data folder. Check the models to make sure each json file includes the correct data model for each category.

2. Import data to database. Use this command to import all data from the json files into your database.

```
node seeder -i
```

3. Destroy all data. Use this command to destroy all data from the database.

```
node seeder -d
```

## Screenshots

![Documentation](https://i.imgur.com/A7K4ZNW.png "Documentation")
![Postman Collection](https://i.imgur.com/napUpMg.png "Postman Collection")

## Built With

- JavaScript
- NodeJS
- ExpressJS
- MongoDB Atlas
- Postman
- VSCode
- AWS Elastic Beanstalk
- AWS Route 53
- Amazon S3
- AWS CodePipeline

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
