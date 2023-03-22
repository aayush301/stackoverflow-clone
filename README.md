# Knowledge Bytes

A place to share and organize knowledge where you can ask or answer questions.

![image](https://user-images.githubusercontent.com/86913048/226942578-d9e57e4b-4be5-4c79-97c7-48d7fdaaf2d1.png)

## Table of Contents

- [Features](#features)
- [Tools and Technologies](#tools-and-technologies)
- [Dependencies](#dependencies)
- [Dev-dependencies](#dev-dependencies)
- [Prerequisites](#prerequisites)
- [Installation and setup](#installation-and-setup)
- [Backend API](#backend-api)
- [frontend pages](#frontend-pages)
- [npm scripts](#npm-scripts)
- [Contributing](#contributing)
- [Useful Links](#useful-links)
- [Contact](#contact)

## Features

### User-oriented features

- Signup
- Login
- Logout
- Forgot and reset password
- Users can ask questions providing the title and body with formatting as well.
- Users can edit the questions asked by them.
- The already asked questions with their answers can be viewed by all people.
- Users can answer the questions by selecting any from all the questions present.
- Users can also view questions specifically asked by them.
- Users can view and edit their profile. This also includes changing their username and password as well.
- Users can bookmark/unbookmark a question or a specific answer.
- Users can view the bookmarks on separate page, where they can directly toggle those.
- Users can like the questions/answers of others. The like count is publicly visible.
- All the likes of a user can also be accessed separately.
- Users can view their activities in separate page.
- Link to question or a specific answer to question can also be copied.
- Questions along with the answers can also be downloaded.

### Developer-oriented features

- Loaders used when fetching data
- Dynamic document titles
- Date formatting to "X time ago" for displaying dates
- DARK and LIGHT theme
- Editors used in website for providing various styles
- Emails sent using nodemailer for account activation, reset password etc.
- Form validations in frontend and backend
- Global user state using Redux
- Highlight specific answer on page load based on link url
- Prompt login modal when non-logged persons try to perform auth activity
- Responsive Sidebar with toggle option
- Slugs used for SEO friendly URLs
- Search params used for applying filters
- Toasts for success and error messages
- Use of 404 page for wrong urls
- Use of layout component for pages
- Usage of Tooltips
- Usage of Popconfirm modals for asking for confirmation
- Usage of React hooks like useState, useEffect, etc.
- Custom hooks used like useFetch, useDebounce etc.
- Resource availability checking (to check availability of username of a user while he types)
- Website themed using tailwind config
- Middleware for verifying the user in backend
- Routes protection
- Token based Authentication
- Use of Promise.all in backend to improve efficiency
- Use of different HTTP status codes for sending responses

## Tools and Technologies

- HTML
- CSS
- Javascript
- Tailwind CSS
- Node.js
- Express.js
- React
- Redux
- Mongodb
- Vitejs
- Font Awesome
- Google Fonts

## Dependencies

Following are the major dependencies of the project:  
Frontend:

- axios
- jspdf
- react
- react-dom
- react-redux
- react-router-dom
- react-simple-wysiwyg
- react-toastify
- redux
- redux-thunk

Backend:

- bcrypt
- cors
- dotenv
- express
- googleapis
- jsonwebtoken
- mongoose
- nodemailer

## Dev-dependencies

Following are the major dev-dependencies of the project:

- nodemon
- concurrently

## Prerequisites

- Node.js must be installed on the system.
- You should have a MongoDB database.
- You should have a code editor (preferred: VS Code)

## Installation and Setup

1. Download the source code in your desired location on your system.
2. Open the code in your code editor.
3. Go to terminal and type the following command and hit enter:

   ```sh
   npm run install-all
   ```

   This will install all the dependencies and dev-dependencies required at root, at frontend and at backend in your project.

4. Create a file named ".env" inside the backend folder and add data from .env.example file and substitute your credentials there.

5. Go to terminal and type the following command and hit enter:

   ```sh
   npm run dev
   ```

   This will start both backend and frontend.

6. Open browser and go to url: http://localhost:3000. You can see the app running now.

## Backend API

The backend api docs file is already provided in the project.  
Please refer to [this](https://github.com/aayush301/Knowledge-bytes/blob/main/backend/ApiDocs.md) link to view.

## Frontend pages

The list of routes for frontend pages can be found on the RouteProvider Component in project.  
Please refer to [this](https://github.com/aayush301/Knowledge-bytes/blob/main/frontend/src/routes/RouteProvider.jsx) link to view.

## npm scripts

At root:

- `npm run dev`: Starts both backend and frontend
- `npm run dev-server`: Starts only backend
- `npm run dev-client`: Starts only frontend
- `npm run install-all`: Installs all dependencies and dev-dependencies required at root, at frontend and at backend.

Inside frontend folder:

- `npm run dev`: Starts frontend server in development mode.
- `npm run build`: Builds frontend into dist folder.
- `npm run preview`: For Previewing the build.

Inside backend folder:

- `npm run dev`: Starts backend using nodemon.
- `npm start`: Starts backend without nodemon.

## Contributing

- Feature Requests:  
  Want a new feature or improve already existing feature in the app? Feel free to create an issue at [issue tracker](https://github.com/aayush301/Knowledge-bytes/issues) about the feature you want to see in the app.
- Bug reports:  
  Found a bug in the application? Feel free to create a new issue at [issue tracker](https://github.com/aayush301/Knowledge-bytes/issues) stating the clear description of the bug.

- Code contributions:  
  Want to contribute code to the project? You can do so by either correcting bugs or adding new features which can be found in the issues tab and then submitting a Pull Request referencing that issue.

- Security vulnerabilities:  
  Discovered a security vulnerability within this project? Please send an email to Aayush (author) at aayush5521186@gmail.com.

## Useful Links

- This project

  - Github Repo: https://github.com/aayush301/Knowledge-bytes

- Official Docs

  - Reactjs docs: https://reactjs.org/docs/getting-started.html
  - npmjs docs: https://docs.npmjs.com/
  - Mongodb docs: https://docs.mongodb.com/manual/introduction/
  - Github docs: https://docs.github.com/en/get-started/quickstart/hello-world

- Youtube tutorials

  - Expressjs: https://youtu.be/L72fhGm1tfE
  - React: https://youtu.be/EHTWMpD6S_0
  - Redux: https://youtu.be/1oU_YGhT7ck

- Download links

  - Nodejs download: https://nodejs.org/
  - VS Code download: https://code.visualstudio.com/

- Cheatsheets
  - Git cheatsheet: https://education.github.com/git-cheat-sheet-education.pdf
  - VS Code keyboard shortcuts: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf
  - CSS Selectors Cheatsheet: https://frontend30.com/css-selectors-cheatsheet/

## Contact

- Email: aayush5521186@gmail.com
- Linkedin: https://www.linkedin.com/in/aayush12/
