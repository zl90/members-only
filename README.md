# members-only
Only registered members can post!
Members Only is a CRUD app built on Express.js and MongoDB, hosted on Heroku.
It uses Passport.js to authenticate users.

Members Only allows users to register, log in and write stories to post on the main wall. Each user has access to a "My Account" page which displays account information. Only registered users can post stories, and can delete their own stories after posting. Additionally, only registered users can see the authors of each story.

Go ahead: sign up, post your story and join in on the fun!

### [Live Demo](https://powerful-lowlands-74616.herokuapp.com/) (Hosted on Heroku - give it a few seconds for the server to wake up!)


### Desktop
![Desktop View 1](https://powerful-lowlands-74616.herokuapp.com/images/desktop-view1.png)

![Desktop View 2](https://powerful-lowlands-74616.herokuapp.com/images/desktop-view2.png)

### Mobile
![Mobile View 1](https://powerful-lowlands-74616.herokuapp.com/images/mobile-view1.png)

![Mobile View 2](https://powerful-lowlands-74616.herokuapp.com/images/mobile-view2.png)

## Overview

I built this CRUD app to get familiar with the following concepts:

- User authentication with [Passport.js](https://www.passportjs.org/)
- Express.js: routing based on http requests.
- Mongoose: modeling, storing and accessing MongoDB documents.
- [Pug.js](https://pugjs.org/api/getting-started.html): using a templating engine for the front-end.
- Deploying an Express app to [Heroku](https://www.heroku.com/).
- Using environment variables to protect sensitive info (DB credentials, Admin Password).

### Tech used

- [Heroku](https://www.heroku.com/) for hosting.
- [npm](https://www.npmjs.com/) for dependencies.
- [Express.js](http://expressjs.com/) for serving and middleware.
- [Mongoose ODM](https://mongoosejs.com/) for the backend.
- [Pug.js](https://pugjs.org/api/getting-started.html) for the frontend.
- [Passport.js](https://www.passportjs.org/) for user authentication.
