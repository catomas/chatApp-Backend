# Chat Application

This is a simple chat application that allows users to send messages to each other. The Backend is built using Node.js and the Frontend is built using React.js. The application uses websockets to send messages between the server and the client. This is the server part of the application.

## Server

### Requirements

- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

### Steps

1. Clone the repository

```shell
git clone https://github.com/catomas/chatApp-Backend.git
```

2. Rename the `.env.example` file to `.env` and fill in the required fields

```shell
mv .env.example .env
```

3. Install the dependencies

```shell
npm install
```

4. Start the server

```shell
npm start
```

### Considerations

- Make sure the frontend part of the application is running. You can find the frontend part of the application [here](https://github.com/catomas/chatApp-Frontend)

- Make sure mongodb is running in background

## Application URL

- Frontend: https://chat-web-frontend.netlify.app
- Backend: https://chat-app-backend-zrt6.onrender.com
