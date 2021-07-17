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

main files are `index.js` & `api/messages.js`

## Task 2
This task will expect 2 arguments, the file with prices and the gift card balance.
To run this project type:
```sh
$ yarn run task2 -- giftCardBalance=87 fileName=task2/data.json
```
There is a sample file at `task2/data.json`

The src file is at `task2/task2.js`

This solution supports only getting 2 gifts to settle the balance at will do it in O(n) time. Specific solutions are better than generic ones to handle N gifts.
So to get 3 or more gifts the complexity will increase. So to do that we will need a more complex algorithm and the usage of Workers.
The loading of the file must be async and the computation of the N gifts shoukld be sent to a tread Worker so the server cancontinue with something else.
A promise is not the solution since when it starts a heavy computation will block the event loop until it finish the task.