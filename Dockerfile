FROM node:6

# Home directory for Node-RED application source code.
RUN mkdir -p /usr/src/node-red

# User data directory, contains flows, config and nodes.
RUN mkdir /data

WORKDIR /usr/src/node-red

# Add node-red user so we aren't running as root.
RUN useradd --home-dir /usr/src/node-red --no-create-home node-red \
    && chown -R node-red:node-red /data \
    && chown -R node-red:node-red /usr/src/node-red

USER node-red

# package.json contains Node-RED NPM module and node dependencies
#COPY package.json /usr/src/node-red/
COPY . /usr/src/node-red/

#RUN npm config set registry http://bef-dev-ci:8081/repository/npm-all
RUN npm install
#RUN npm install node-red-contrib-skplanet-api
#RUN npm install node-red-contrib-thingplug
#RUN npm install node-red-contrib-variable
#RUN npm install node-red-contrib-skt-baas-api
#RUN npm install node-red-contrib-skt-tp-http-in
#RUN npm install node-red-contrib-skt-sms-api

# Environment variable holding file path for flows configuration
ENV FLOWS=flows.json
ENV FEATURE_SERVICE=http://50.1.111.54:8060

# User configuration directory volume
EXPOSE 1880

CMD ["npm", "start"]
