# BriteCore Coding Challenge

> A Vue.js project

## Project Overview

The primary goal of the project was to create a Modular User Interface for the BrightCore platform using modern JavaScript tools/frameworks. I chose to use [VueJS v2.5](https://vuejs.org/) as the presentation layer and  [Bootstrap](http://getbootstrap.com/) as the base theme for speed and simplicity.

This project also uses [NPM](https://www.npmjs.com/) and [WebPack](https://webpack.js.org/) to manage dependencies and transform source files into production-ready code. All project dependencies can be found in the `package.json` file or running `npm ls` from the command line.

## Project Structure

| Path | Description |
| :--- | :---------- |
| .babelrc | Configuration file for Babel, a JavaScript compiler that converts our JavaScript into more browser-friendly code. |
| .gitignore | Defines what files/folders should be ignored by git. |
| index.html | Base HTML template for entire project. All VueJS logic is injected into this file. |
| package.json | Entry point for NPM. Defines all project dependencies and build scripts. |
| webpack.config.js | Entry point for WebPack. Defines all project dependencies and build tasks. |
| src/ | Contains all source files which will be compiled and converted into production-ready code. |
| src/assets/ | Contains static assets which do not need to be modified in any fashion but are used in production. |
| src/components/ | Contains all VueJS component files used throughout this project. |
| src/scss/ | Contains reusable SASS modules which can be imported on an as-needed basis throughout our project. |
| src/App.vue | Base VueJS template and entry point for all our VueJS logic. |
| src/main.js | Initializes our VueJS instance and injects global dependencies. |
| src/router.js | Defines all our VueJS routes and injects their dependencies. |

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
