# My Kanban

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Description](#Description)
- [Installation](#Installation-Instructions)
- [Usage](#Usage-Instructions)
- [Credits](#Credits)
- [License](#License)
- [Features](#Features)
- [Questions](#Questions)

## Description

In this project, I exercise using jsonwebtoken to enable authentication of the user's login throughout the website. This application allows users to securely manage tasks across columns (such as "To Do," "In Progress," and "Done") and supports CRUD (Create, Read, Update, Delete) functionality for task items.

### Deployed Application Link
[https://my-kanban-v94q.onrender.com/](https://my-kanban-v94q.onrender.com/)

## Requirements

- PostgreSQL downloaded and configured in your computer

## Installation Instructions

1. Clone the repository
2. Navigate to the root project folder
3. In a terminal, use `npm run install` to install all dependencies
4. Navigate to the server folder
5. Duplicate the `.env.EXAMPLE` file and rename it to just `.env`
   - The .env file should look something like this

```
DB_NAME='kanban_db'
DB_USER='postgres'
DB_PASSWORD='rootroot'
JWT_SECRET_KEY='mysecretkey'
```

6. Replace `postres` and `rootroot` with your posgresql username and password if need be

## Usage Instructions

1. In a terminal, use `npm run start` to build and run the application locally
2. Open a web browser and enter [localhost:3001](http://localhost:3001/) to the url bar
3. Click on the login button on the top right corner of the application and log in with valid user credentials

## Credits

Keith Sialana

## License

MIT

## Features

- User Authentication
- Task Management (Task CRUD)
- Task Board with Kanban Interface

## Screenshots
### Login Page
![Login](client\public\login.png)
### Kanban Page
![Login](client\public\kanban.png)
### Create Ticket Page
![Login](client\public\create_ticket.png)

## Questions

- [GitHub](https://github.com/keithrsialana)
- [Email](mailto:keith.sialana@hotmail.com)
