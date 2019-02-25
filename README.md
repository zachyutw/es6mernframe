# Express Starter 2018
+ fork from git+https://github.com/tomyitav/express-es6-starter.git
Starter project for creating a MVC express server, using

+ express
+ mongoose
+ babel-cli
+ winston and morgan for logging
+ Async/Await

## Installation
```bash
yarn
```

## Starting the server

```
npm start
```

The server will run on port 5000. You can change this by editing `config.dev.js` file.

## Run server in production with Docker

```
npm run build
```

After npm building the project, go to project root directory, open shell and run:
```
docker build -t express-es6-starter .
```

Instructions about running the container are available [here](https://hub.docker.com/r/tomyitav/express-es6-starter/)

## Debugging with Webstorm

Set babel-node executable as the node interpreter.
Pass node parameters of --preset=babel-preset-es2015

---

# Skeleton (new)
+ contorllers
+ core
+ data
+ models
+ db
+ routes
+ schemas
+ seeds
+ services
+ server.js
+ Dockerfile
+ log

# API RESTPlugins
- req.query ( ex: http://doamin.com/api/routeName/list?id=1&name=abc)
    * select strings
    * popualte strings
    * $fieldName string select field in the value
    * fieldName string where query with match value
    * page number pageNumber
    * limit number perPage
    * sort  string fieldName 'asc' -fieldName 'desc'

# Mac 
## Nginx
### Basic Command
``` bash
brew services start nginx
brew services stop nginx
```
### config file
- /usr/local/etc/nginx/nginx.conf
先修改 /etc/hosts（需 root 權限），讓 www.example.com 指向本機

# /etc/hosts
127.0.0.1 www.example.com

## Warning DEP0079
[https://github.com/Automattic/mongoose/issues/6420]