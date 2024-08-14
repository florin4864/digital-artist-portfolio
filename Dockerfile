FROM node

# Setup client base environment
WORKDIR /webapp/client
COPY ./client/package.json /webapp/client
RUN npm install

# Setup server base environment
WORKDIR /webapp
COPY ./package.json /webapp
RUN npm install

# Copy project source to container
COPY . /webapp

# Build and run project
CMD [ "bash", "/webapp/scripts/run-prod-all.sh" ]
