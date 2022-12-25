## Solution
### 1. Install the dependencies

    1. Install [Node.js](nodejs.org/en/download/) (v8.9.4 or higher)
    2. Install NPM (v5.6.0 or higher)
    3. Install MySQL (v5.7.21 or higher)
    4. Move to Backend folder and run `npm install`
    5. Move to Frontend folder and run `npm install`

### 2. Create a database

    1. Create a database
    2. Create a tables as in the file `tickets.sql` or directly import the file

### 3. Configure the backend

    1. Move to Backend folder
    2. Create a file `.env` and copy the content of `.env.example` to it
    3. Change the values of the variables in the `.env` file

### 4. Run the backend
    
    1. Move to Backend folder
    2. Run `npm start`

### 5. Run the frontend
    
    1. Move to Frontend folder
    2. Run `npm start`

### 6. Open the application
        
    1. Open the browser and go to `http://localhost:3000`

## Notes

    1. The backend is running on port 8000
    2. The frontend is running on port 3000
    3. The database is running on port 3306

## Author
    
    1. Sudhanshu Mishra (sudhanshu.mishra.8826@gmail.com)

### Code Structure Explanation

#### Backend

    1. The backend is built using Node.js and Express.js and TypeScript and MySQL

    2. The backend is divided into 3 Components
        1. types: Contains the types used in the backend
        2. index: Contains the express app and is the controller for each of the routes/API Endpoints
        3. models: Contains the models interacting with the database as per the schema

    3. Routes
        1. /tickets: Contains the routes for the tickets
            1. GET /tickets: Returns all the tickets
            2. GET /tickets/:id: Returns the ticket with the given id
            3. POST /tickets: Updates the ticket with the given id

    4. The backend is running on port 8000

    5. Libraries used
        1. express: Used for creating the server
        2. dotenv: Used for loading the environment variables
        3. mysql: Used for interacting with the database
        4. cors: Used for enabling CORS

#### Frontend

    1. The frontend is built using React.js and TypeScript and Vite

    2. The frontend is divided into 3 Components
        1. pages: Contains the pages used in the frontend and the components to since it was a smaller simpler application
        2. types: Contains the types used in the frontend
        3. main.tsx: acting as our entry point for the application has all the routes

    3. The frontend is running on port 3000

    4. Libraries used
        1. react: Used for creating the frontend
        2. react-router-dom: Used for routing
        3. axios: Used for making the API calls

    5. The frontend is divided into 3 pages
        1. /: Contains the list of all the tickets
        2. /ticket: Contains the details of the ticket and dropdown to update the statusticket
    

## Screenshots

    All the screen shots are in the Screenshots Folder 
    




