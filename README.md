<div align="center">
    <img height="100px" src="./images/imageGIF.gif"/>
    <h1>LivePoll - Live Polling Platform</h1>
</div>

LivePoll is an interactive web application designed to simplify the process of creating, participating in, and managing polls. It combines user-friendly features with real-time updates to deliver a seamless polling experience📊.

## Features

- User can signup and login using his credentials, used cookie based authentication with jwt.
- User can browse all the Polls created by other users in a pagination format and click on view to view the poll.
- In poll view page user can vote on the poll and see the result of the poll live with chart using sockt.io.
- User can bookmark the poll and see the bookmarked poll in bookmark page.
- In user dashboard user can see the their details and manage their poll.
- By clicking on the create poll button user can create a new poll and add options to the poll.
- Used react-toastify for showing the error and success message.
- Used chart.js and scocket.io-client for showing the poll result live in chart in poll view page.
- Used daisyui and tailwind for styling the UI of the application for responsive design.

## Links

- [Live Website](https://livepoll.manikmaity.com/) - Loading time may take few seconds initially (free tier).
- [Backend Routes Doc](https://livepoll-backend.manikmaity.com/docs/)

## Preview Images

### Home Page

<img src="./images/Home.png"/>

### Polls Page

<img src="./images/pollsPage.png"/>

### Login Page

<img src="./images/Screenshot 2024-11-14 101710.png"/>

### Signup Page

<img src="./images/signup.png"/>

### Poll Votting Page

<img src="./images/votingPage.png"/>

### Dashboard Page

<img src="./images/dashboard.png"/>

### Create Poll Page

<img src="./images/createPollPage.png"/>

### Bookmarks Page

<img src="./images/bookmark.png"/>

## Tech Stack

### Frontend

Framework & Routing: `ReactJS`, `React Router`  
State Management: `Zustand`, `React Query`  
Real-Time & Charts: `Socket.io-client`, `react-chartjs-2`  
Styling: `TailwindCSS`, `DaisyUI`  
Notifications & Icons: `React-Toastify`, `React Icons`

### Backend

Framework & Authentication: `Node.js`, `Express.js`, `JWT`, `bcrypt`  
Validation & Documentation: `Zod`, `Swagger-jsdoc`  
Real-Time Communication: `Socket.io`  
Database & ORM: `Mongoose`

### Others

API Communication: `Axios`

## Installation and Setup

### Prerequisites

- Node.js and npm/yarn installed.
- MongoDB database set up locally or on a cloud provider.

### Steps

1. Clone the Repository

   ```bash
   git clone https://github.com/ManikMaity/LivePoll.git
   cd LivePoll
   ```

2. Backend Setup
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add the following:
     `env
PORT=3000
DB_CONNECTION="your mongodb url" 
SALT_ROUNDS=6
JWT_PRIVATE="your jwt private key"
CLIENT_URL="your client url"
 `
   - Start the server:
     ```bash
     npm run dev
     ```

3. Frontend Setup
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Update `.env` file with the backend URL (e.g., `http://localhost:3000`).
   - Start the development server:
     ```bash
     npm start
     ```

4. Access the Application
   - Open a browser and go to `http://localhost:5173`.

---

### To Switch Between Local and Deployed Environments

- Update backend `.env` with:
  ```env
  BACKEND_URL=http://localhost:3000
  ```
- Update frontend Axios base URL to:
  ```javascript
  axios.defaults.baseURL = "http://localhost:3000/api/v1";
  ```
- Update the Socket.io URL in the voting page:
  ```javascript
  const socket = io("http://localhost:3000");
  ```

---

## Usage

- Navigate to the `frontend` directory and run `npm run dev` to start the development server.
- Navigate to the `backend` directory and run `npm run dev` to start the server.
- Open a browser and go to `http://localhost:5173` to access the application.

## Future Improvements

- Add a search feature to the poll page.
- Add like feature to the poll.
- sorting polls using created date and popularity.
- Updated user.
- User avatar.
- Multiple question poll.
