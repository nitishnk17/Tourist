# Tourist

![Image 2](https://github.com/nitishnk17/Tourist/blob/main/img/img3%20(3).png?raw=true)  
![Image 1](https://github.com/nitishnk17/Tourist/blob/main/img/img3%20(2).png?raw=true)
![Image 3](https://github.com/nitishnk17/Tourist/blob/main/img/img3%20(4).png?raw=true)  



Tourist is a website where users can create and review Places. In order to review or mark a Place, you must have an account.

## Features

* Users can create, edit, and remove Place

* Users can review Places once, and edit or remove their review

* User profiles include more information on the user (full name, email), their Place, and the option to edit their profile or delete their account

* Search Place by name or location

  
  
  ## Run it locally
1. Install [mongodb](https://www.mongodb.com/)
2. Create a cloudinary account to get an API key and secret code

```
git clone 
cd yelpcamp
npm install
```

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
```

Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.  

Then go to [localhost:3000](http://localhost:3000/).

