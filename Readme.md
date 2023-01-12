# Note

- for some reason backend consider current date as future input for add claim form

# What else could be done? (outside of assesment scope)

- if redux was used, could have added global api request status tracker and manage it using thunk api calls whenever a request is executed

- use husky for pre-commit  hook to auto format,lint,build code and run test before commiting so we can ensure that commit is proper

- use react query for api calls to have it cached and enhance UX and performance

- Add caching settings using mainfest.json

- Add CI/CD to auto deploy after pushing code to repo

# Production serving
- npm run build
- cd build
- npx serve

# Development serving
- npm run start


# Env variables

- create .env file
- add variable with name of  REACT_APP_API_URL
- assign value of http://localhost:8001 to REACT_APP_API_URL