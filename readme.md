## Generate Social Network

##### Generate was inspired by Project 2 of our General Assembly Software Engineering Immersive. It is a full-stack web application using Express, Node.js, Mongoose, and MongoDB.

The objective of the project was to reverse engineer an existing site. _We chose Instagram._ From the beginning, we knew that styling would be an important element of this project.
We spent the first few days getting a theme that we were happy with, based visually on existing social media sites like TikTok/Instagram. While doing this, we had one team member doing
research on API's we could incorporate in the project, one working on the backend routing and configuration, and one focused on CSS clarity and consistency throughout the project.
At the end of this project, we feel like we've created the foundation for a clean-looking and functional social media site with room to improve.

### Hurdles

We found that nailing down CSS took longer than we expected, so in future projects, scoping the adequate time needed to address such issues will be important.

GitFlow gave us some challenges in the early stages, as none of us had coded collaboratively in GitHub before; but by the end, we had a good system of frequent pushes and pulls to/from our Dev branch and more frequent and open communication about what we were working on.

Our initial idea for this project, to recreate TikTok, proved to have significant unforseen hurdles in the form of gathering content into our database or gathering data from 3rd party API requests. Most API services by large
social media sites have either strict requirements for how their content is used (e.x. watermarks, dev keys) or formatting restrictions that were a bit beyond our skill level. On day 3, we decided to make the switch to an image-based social media site,
which we felt would still give us good experience building a full-stack application.

### Technologies Used:

1. HTML
2. CSS
3. JavaScript
4. Node.js
5. Express.js
6. MongoDB
7. BCrypt
8. Axios

### Installation

1. Clone the repository: git clone https://github.com/JuanitoDeLaTorre/Unit-2-Group-Project.git
2. Install the dependencies: npm install
3. Create a .env file and add your MongoDB connection string: GENERATE_DB = mongodb+srv://Munjal:Mongo123@cluster0.ew0j2a2.mongodb.net/?retryWrites=true&w=majority
4. Start the server: npm --watch app.js
5. Open the site in your browser: http://localhost:3000

### Features

1. Create an account
2. Create a new post to your account
3. View all user posts on homepage
4. View all your own picture posts on your profile page
5. View all the users on the social network
6. Update a post including the actual image, the location, and the title
7. Delete a post
8. Create a comment on any post, the comment information will follow that post wherever it is viewed on the site

### Tutorial/User Story

1. To create a New Account, click the Sign Up button on the upper right hand corner.
   Once signed in, you’ll be directed to the For You page where you can see All Posts made.
2. To create a new post, click the "Upload" button and fill out the form.
3. To view all posts, go to the For You page.
4. To update a post, click the "Profile" button to goto your profile & click the Edit/Delete button.
5. To delete a post, click the "Edit/Delete" button on your profile and an x will appear in the corner of the posts. Click x to the posts you want to delete.

### Future Feature to Add

Social media sites are designed to have a suite of unique and engaging features that enrich the site. When we started, we wanted to incorporate features like

1. A like button that would update features in MongoDB
2. A share button that would, at the very least, send an email with the link of the user's profile to an inputted email
3. A follow feature and "following" tab that would let you quickly see all the content from your followed accounts
4. Tags that would be attached to all images to allow themed searches
5. Deeper incorporation of the Unsplash API in elements like filling fake user's accounts with photos

Given more time, we feel like these features (and more) would be easily achievable, but given the one-week time frame and, frankly, our limited experience building full-stack applications, we were not able to accomplish them.

### Contributing Teammates

-John Thomas
-Ali Colak
-Sean Munjal

### License

MIT
