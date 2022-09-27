FROM node

ARG API_HOST
ENV REACT_APP_API_HOST=$API_HOST

ADD . /app
RUN cd app && npm install && npm install -g serve && npm run build
WORKDIR /app
CMD serve ./build