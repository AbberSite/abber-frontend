# use node 16 alpine image
FROM node:20-alpine

# create work directory in app folder
WORKDIR /abber-frontend

# install required packages for node image
RUN apk --no-cache add openssh g++ make python3 git

# copy over package.json files
COPY package.json /abber-frontend/
COPY package-lock.json /abber-frontend/

# install all depencies
RUN npm ci && npm cache clean --force

# copy over all files to the work directory
ADD . /abber-frontend

# install
RUN npm i

# build the project
RUN npm run build

# expose the host and port 3000 to the server
ENV HOST 0.0.0.0
EXPOSE 3000

# run the build project with node
ENTRYPOINT ["node", "./.output/server/index.mjs"]