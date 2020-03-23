# React Setup
### By Phil Mass

A basic React project template, as a simplified alternative to create-react-app. I wanted more control over the project setup and also wanted to learn how to set up everything correctly. I'm particularly not a fan of create-react-app's jest testing and have set up simpler testing using mocha.  

To create a new project from this template, clone it, replace `corona-graphs` with the name of your project, and start adding your own code.  
- `package.json`
- `dist/index.html`
- `dist/manifest.json`
- `dist/serviceWorker.js`
- `src/utilities/serviceWorker.js`

The steps to recreate this template are documented below.  

## Steps to create this React template
- Create the project directory, initialize git and npm
```console
git init
npm init
```
- Create `.gitignore`
- Create `README.md`
- Create the source directories and files
  - *I've included css normalization and a local-storage hook that I use on most projects*
- Install the following packages using `npm install --save-dev`
```console
webpack webpack-cli webpack-dev-server
@babel/core @babel/preset-env @babel/preset-react babel-loader
react-hot-loader
eslint eslint-loader babel-eslint eslint-plugin-react
url-loader file-loader
css-loader style-loader
gh-pages
```
- Install the following packages using `npm install`
```console
react react-dom
```

## Legal
Copyright 2019 Phil Mass  
Distributed under the MIT license
