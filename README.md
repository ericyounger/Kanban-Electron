# Still working on this, not complete at all.
## Cloning and running this project will not work for others than me at this time, oAuth requires the use of a server to handshake with, and i am only working with a localhost server, limited functionality until i deploy the server.

## Status for version 1.0 in no particular order:
- [x] Integrate React with Electron
- [x] Setup core layout
- [x] Get methods to pull needed information from API
- [x] Filtering/display methods on dashboard
- [ ] Make design responsive
- [x] Integrate user/repo selection with core layout
- [x] Make Post methods work
- [ ] Create user settings page
- [ ] Implement second sidebar
- [x] Add custom menus to Electron
- [ ] Add functionality to custom menus
- [ ] Find out how to package project to native runners
- [x] Research and add oAuth instead of personal tokens
- [ ] User tests
- [ ] Bug fixes
- [ ] Better design pattern for re-render and less API calls.
- [x] Add Oauth Authentication
- [ ] Implement the rest of the API calls.
- [ ] Restructure project from prototype
- [ ] Fix oAuth scope permission on deployment
- [x] clean up url after callback oAuth
- [ ] Automatic build and deployment with badges on github readme
- [ ] Integrate Passport.js for oAuth instead of own solution

## Possible extensions for version 1.01:
* Custom issue boards for user
* Realtime issue tracking on dashboard
* Chat with team members
* Search/filter for specific issue
* Implement milestones




# Screenshots:

<img width="1792" alt="Skjermbilde 2020-01-26 kl  20 12 08" src="https://user-images.githubusercontent.com/44582953/73140353-3654c600-4078-11ea-8e48-d57555aa680f.png">


<img width="1792" alt="Skjermbilde 2019-12-15 kl  23 12 04" src="https://user-images.githubusercontent.com/44582953/70870193-71031300-1f90-11ea-81d2-779d74eed85b.png">



## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all dependencies needed to run this application

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run electron-start`

Runs the react application within the Electron component/wrapper.
User needs to run npm start first.
