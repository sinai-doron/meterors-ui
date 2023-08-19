<p align="center">
  <img src="https://cdn.iconscout.com/icon/free/png-256/free-meteor-3273589-2741632.png" width="150" alt="Mrteor" />
</p>
# Meteor App UI

This is the UI for the MEteor server app

In the project directory, you can run:

## Running the App locally

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Running the App as a container
1. Build the docker in the main folder of the project
`docker build . -t meteor_ui`

2. Run the container
`docker run --rm -it -p 8080:80 meteor_ui`
3. Access the website
`http://localhost:8080`
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


