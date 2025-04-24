# Workrity Task App - React + TypeScript + Vite

This project is a minimal yet feature-rich application built with **React**, **TypeScript**, and **Vite**. The goal of the project is to provide an intuitive and modern web application to manage tasks, assignments, and communications. This setup leverages **Vite** for fast bundling and **React** with TypeScript for type safety and development efficiency.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Test Command](#test-command)
- [API Environment URL](#api-environment-url)
- [ESLint Configuration](#eslint-configuration)
- [Technologies](#technologies)




**## Installation**

To get started with the project, clone the repository and install the dependencies using npm:

git clone <repository-url>
cd <project-directory>
npm install
This will install all required dependencies for running the project. Make sure you have Node.js installed on your machine.



**##Development**
Once you have installed the dependencies, you can start the development server by running:

npm run dev
This will launch the app in development mode with Hot Module Replacement (HMR), allowing for fast updates while editing files.



**Test Command**
To run the tests, use the following command:
npm test
This command will execute the Jest testing framework, running all the tests for the project. It helps ensure that the code is functioning as expected and is free from regressions.

**API Environment URL**
For API requests, use the following environment variable for the backend URL:
VITE_API_URL=https://workrity-server.onrender.com/api
This URL points to the backend API that handles the business logic and data management for the app.

**ESLint Configuration**
This project comes with an ESLint configuration to ensure consistent code quality. If you are developing a production application, we recommend updating the configuration to enable type-aware linting rules.




**Expanding the ESLint configuration**
Here is an example of how to expand the ESLint configuration for stricter type-checking:

export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
You can also install additional plugins for React-specific linting:
npm install eslint-plugin-react-x eslint-plugin-react-dom
Then, update your ESLint configuration like so:

// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})




**#Technologies**
This project utilizes the following technologies:

React: A JavaScript library for building user interfaces.

TypeScript: A strongly typed superset of JavaScript that helps with static type checking.

Vite: A next-generation build tool that provides fast bundling and development experience.

Jest: A testing framework for JavaScript and TypeScript.



Conclusion
This project serves as a foundation for building a React-based web app with TypeScript and Vite. With fast development tooling provided by Vite, type safety with TypeScript, and a clean setup for testing and linting, it is ready for further development and production deployment.

Feel free to clone this repo, install the dependencies, and start building your own features.




