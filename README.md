# Tuxt coding challnege

This repo contains the solution for both tasks asked by Tuxt team

This application supports the [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

```sh
$ git clone git@github.com:emanuelmetal/tuxt-dev.git # or clone your own fork
$ cd tux-dev
$ yarn install
```
## Task 1
For this task to run locally a PostrgreSql instance is required, wherever it is and the connection string sould be set on DATABASE_URL

To run the project run:
```sh
$ yarn start
```
The app should now be running on [localhost:5000](http://localhost:5000/).

## Task 2
This task will expect 2 arguments, the file with prices and the gift card balance.
To run this project type:
```sh
$ yarn run task2 -- giftCardBalance=87 fileName=task2/data.json
```
There is a sample file at `task2/data.json`
