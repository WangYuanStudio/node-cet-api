FROM daocloud.io/library/node
# FROM node:slim

MAINTAINER J3n5en <admin@j3n5en.com>
COPY app /www

# Define working directory
WORKDIR www

# Install app dependencies
RUN npm set progress=false && \
    npm install --global --progress=false

EXPOSE 308

CMD ["node", "index.js"]