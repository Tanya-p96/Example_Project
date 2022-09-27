# grad-project-2022

## Getting Started

To run the example app as a developer you will need to do the following in 3 separate terminals​
​
### Database
Via the magic of containerisation, starts an instance of MongoDb to serve as the backend database:​

`docker run --rm -p 27017:27017 mongo`​

​## Api

From the root of your repo, enable a python virtual environment, then use the following commands to start the api.

```
cd api && \
pip install -r requirements.txt && \
MONGO_URI=mongodb://localhost/testcollection python -m flask run
```

## Frontend
From the root of your repo, use the following commands to start the single page application.

```
cd frontend && \
npm install && \
npm run start
```


Point your browser at http://localhost:3000

You should see a simple app, where you can add items of inventory to a table which shows a total quantity.

If you add in a few items, you will notice a bug. When you add multiple quantities of the same name, the new value is appended to the list instead of showing the aggregate value

