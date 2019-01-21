
This project is a re-implementation of [yify torrents](yts.am), for learning purposes. Uses [yts.am API](https://yts.am/api) and [omdb API](http://www.omdbapi.com/).

**This is a warning, ignore.**

Current deployment lives in `http://yify-react.s3-website-eu-west-1.amazonaws.com/` 

## Avalilable and Maintained Scripts

In the project directory, you can run:

### yarn install

Installs the dependencies specified in `package.json`

### yarn start

Runs the app in development mode, server it in (probably) [http://localhost:3000](http://localhost:3000).

### yarn build

Builds the app for production to the `build` folder.

### yarn deploy

Deploys the production build, `yarn build` is recommended before running this command.

Currently deploys to a S3 Bucket named `yify-react` in `eu-west-1`.
