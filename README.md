# Recollections
This is a Full Stack web application project with a great UI. It is a combination of memories created by different Users (Each user have to Authenticate via Google OAuth 2.0), Each user can like the posts add there own posts and overall contribute there part of building a library full of amazing moments that are important in there lives. It focuses on all part of CRUD and as a result we can easily edit,delete,create or update memory posts.

## It uses below frameworks ->
1) React
2) Noje.js
3) Express
4) Mongoose
5) OAuth 2.0 (for authentication)
6) HTML
7) CSS
8) JS / (EJS)

## To SetUp in your local-environment ->
1) cd to the location of project.
2) npm install -> to install all Dependencies.
   (npm install --legacy-peer-deps) because of later depreciation warning.
3) Split the terminal into two parts (Feature of VSCode).
4) In first terminal -> cd to client
   In second terminal -> cd to server
5) Run npm start in both 'client' and 'server'.
6) Go to localhost:3000 for the website.

(Note - Make a .env file in server folder first before 'npm start')
(.env file format -> 
  PORT = "PORT NUMBER" //5000
  CONNECTION_URL = "MONGO URL STRING"
  ( MONGO URL STRING -> SOMETHING LIKE -> mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.fbtloer.mongodb.net/?retryWrites=true&w=majority )
)

### To add a new Functionality in Website (not OAuth) ->
(In Server) -> routes(posts.js) > controllers(posts.js) to handle the whole route of req.
(In Client) -> 1. make an api call to connect backend via frontend. (In api file)
2. make an action and call api from within action as per use. (In Action folder)
3. Form a reducer based on action. (In reducer folder)
4. Call action function from any file you need by help of 'dispatch' from 'react-redux'

### My Future Ideas for this project ->
1) Add Search functionality. (✔️ Done)
2) To add a 404 error Page. (✔️ Done)
3) To deploy this project Online.
4) To add a share button on this website.
5) (Side task - to make a video and upload on github). (✔️ Done)
6) Add more posts in database. (✔️ Done)

