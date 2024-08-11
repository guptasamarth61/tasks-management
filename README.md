**Instructions to run the app:** <br/>
1. Clone the repo using the command - `git clone https://github.com/guptasamarth61/tasks-management.git`
2. Start Docker Desktop. If you don't have it installed, you can install it from [here](https://www.docker.com/products/docker-desktop/).
3. Cd into the cloned repo using - `cd tasks-management`
4. Start the docker container using - `docker compose up --build` This might take a while, since it will install clean image of mongo, allong with all the node dependencies. 
5. Launch `http://localhost:3000/` in your Web Browser. This will open the user login page. You can use the following credentials:
     UserName: `samarth`
     Password: `Qwerty@123`
This will log you in the task management page. You can add tasks, update them, delete them. There is also a dashboard at the top that shows the Summary of the tasks status - completed, inprogress or pending using charts. 
 <br /> <br /> <br /> <br />
   
**Instructions to run individual components (Optional):** <br /> <br/>
In case you want to test the individual components, you can do so as follows: <br/>
 <br/>
**Backend** <br/> <br/>
Backend APIs can be tested using Postman. The different API and methods to test them are as follows: <br/>
1. Make sure you have mongodb installed in your system. If you don't have it installed, you can download the `mongodb-community` edition [here](https://www.mongodb.com/docs/manual/administration/install-community/).
2. Start the mongodb server. On Mac, you can do it through - `brew services start mongodb-community` You can run this in a separate tab in the terminal.
3. In another tab, cd into the backend folder - `cd tasks-backend`
4. Make sure you have node installed, if not you can download it from [here](https://nodejs.org/en/download/package-manager). Once installed, run the command to install the dependencies from the package.json file - `npm install`. This will create the node-modules folder.
5. Run `npm run start` to start the backend server. This will start the backend server in a while. You can now test the APIs on Postman
<br/><br/>
**_API Description and Testing_** <br/>
The backend supports following APIs:
1. Auth API - This is implemented using JWT based authentication mechanism. For now, I have added a hardcoded single user name: `samarth` and password:`Qwerty@123`. To test this in Postman, create a `POST` request with url - `http://localhost:3001/auth/login` and body `{"username":"samarth","password":"Qwerty@123"}`. This will generate an access_token with a expiry time of 15 mins. This access_token is to be used in all the subsequent APIs as they are protected using the `Bearer-token` auth. <br/>
**Important: To test other APIs, add the access_control from above as the value for the Bearer Token type under Auth heading.**
2. Get all tasks: This is a `GET` API with url - `http://localhost:3001/tasks` This will show all the tasks present in the DB.
3. Get details of any specific task -  This is a `GET` API with url - `http://localhost:3001/tasks/{id}` Replace the id with the id of the corresponding task. It will return the details of that task.
4. Update details of a task - This is a `PUT` API with url - `http://localhost:3001/tasks/{id}`. Pass the parameters to be updated in the request body. eg: `{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "status": "IN_PROGRESS"
}`
5. Delete a task - This is a `DELETE` API with url - `http://localhost:3001/tasks/{id}`.
6. Get summary - This is a `GET` API with url - `http://localhost:3001/tasks/summary`. It returns a count of the total, completed, inprogress and pending tasks.

<br/> <br/>

**Frontend**
<br/> <br/> The frontend is deployed using Next.js. To test it, make sure the backend server is running,else the API requests will fail. <br/>
1. Cd into the frontend repo: `cd frontend`
2. Install the node dependencies using - `npm install`. This will create the node-modules folder.
3. Start the next.js server by `npm run dev`. In case you are using node version older than `18.17.0`, install a later version as Next.js is not compatible with older versions.
4. Go to `http://localhost:3000/` and login with the credentials. 
