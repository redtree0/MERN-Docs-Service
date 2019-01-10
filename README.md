# MERN-Docs-Service

2주 만에 react 독학해서 만들어본 예제

## Requirement

node.js 

[Reference]

[install node.js package manager](
https://nodejs.org/en/download/package-manager/)

```
root@goorm:/workspace/MERN-Docs-Service# node -v
v8.15.0
```
mongo

[Reference]

[install-mongodb-on-ubuntu]
(https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

```
root@goorm:/workspace/MERN-Docs-Service# mongo --version
MongoDB shell version v4.0.5
git version: 3739429dd92b92d1b0ab120911a23d50bf03c412
OpenSSL version: OpenSSL 1.0.1f 6 Jan 2014
allocator: tcmalloc
modules: none
build environment:
    distmod: ubuntu1404
    distarch: x86_64
    target_arch: x86_64
```
## Run

```
$ npm install
```

```
$ mongod
```

```
$ npm start
```

## npm

### react
- react
- reactstrap
- react-router
- react-treeboard

### mongo
- mongoose

### express
- express-session
- express-socket.io-session
- express-fileupload : 파일 업로드

### socket.io
- socket.io 
- socket.io-client 

### etc
- dotenv : .env 파일 적용
- decompress : 파일 압축 해제


## Compile
babel과 wepack을 활용, es6 코드를 es5로 변환

package.json 파일 내에 scripts 정의

```
  "scripts": {
    "build": "webpack --config webpack.common.js --mode production",
    "dev": "webpack-dev-server --config webpack.common.js --mode development --open --watch",
    "prestart": "npm run build",
    "start": "babel-node src/server/index.js  --presets=env,stage-0",
    "dev:start": "nodemon src/server/index.js --exec babel-node  --presets=env,stage-0",
    "upgradeDeps": "ncu -u",
    "prepublishOnly": "npm run build",
    "test": "nightwatch --env local",
    "ie": "nightwatch -e ie11",
    "sauce": "nightwatch -e chrome,ie11,android_s4_emulator,iphone_6_simulator",
    "upload": "node test/e2e/upload_screenshots_to_s3.js"
  },
```


## URL

|method|url|description|
|:----|----|---------|
|POST|/login|로그인|
|POST|/logout|로그아웃|
|POST|/addUser|회원가입|



## Tests

```
npm install -D chromedriver nightwatch mocha selenium-server
```
nightwatch로 e2e test, mocha로 js test 코드 작성하려다 시간 부족...

설정파일 ``nightwatch.conf.js ``

## 고민 사항

### 1. 파일 접근

fs.read(write)File() vs fs.create(write)ReadStream()

스트림을 사용하면 메모리에 저장된 데이터를 최소한으로 유지할 수 있으므로 훨씬 빠르게 파일을 읽을 수 있기 때문에 파일 접근은 stream으로 처리

![graph](https://cdn-images-1.medium.com/max/1600/1*cbwiLw312iZxrC7lO7nlrw.png)

[Reference]

[fs-readfile-vs-streams-to-read-text-files-in-node-js]
(https://medium.com/@dalaidunc/fs-readfile-vs-streams-to-read-text-files-in-node-js-5dd0710c80ea)



### 2. 채팅 데이터 관리

채팅 데이터를 구조로 mongodb collection 구성해볼까 하다 시간 부족..

![sample data](
https://scotch-res.cloudinary.com/image/upload/dpr_2,w_850,q_auto:good,f_auto/media/54040/Rsw3mrItT2inTaGEqVTQ_image03-e90f8e8989.png.jpg)

[Reference]

[how-to-do-join-operations-and-create-links-between-mongodb-collection](
https://scotch.io/@ossaijad/how-to-do-join-operations-and-create-links-between-mongodb-collection)

### 3. local or dockerize

deploy하는 서비스 환경이 이미 컨테이너 환경이기 때문에 그냥 작업

