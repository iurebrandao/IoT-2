# base image (iurebrandao/application-iot:1.0.0
FROM node:12.2.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /app/
RUN npm install --silent

# start app
CMD ["npm", "start"]