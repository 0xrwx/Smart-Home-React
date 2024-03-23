# Smart-Home-React
This is react application for smart home lamp control. Currently not using any API for dealing with hardware

Every state changing is saving to json file, which used in this app as database of rooms 

## Setting up:

```bash
# Clone this repository
$ git clone https://github.com/1Sayd/Smart-Home-React.git

# Go into the repository
$ cd Smart-Home-React

# Setup client
$ cd client
$ npm i
$ npm start

$ cd ../

# Setup server
$ cd server
$ npm i
# Enable backend service
$ node service.js
# Enable backend index
$ node index.js

# Remove current origin repository
$ git remote remove origin
```

## Screenshots

### Default state (server is off)

![Server is off](screenshots/server%20is%20off.png)

### Default state (server is on)

![Server is on](screenshots/server%20is%20on.png)

### Light Changing states

![client state 1](screenshots/example%20of%20changing%20state%201.png)

<p align="center">(Bathroom light is <b>OFF</b> with <b>brightness 23%</b>)</p>

![client state 2](screenshots/example%20of%20changing%20state%202.png)

<p align="center">(Bathroom light is <b>ON</b> with <b>brightness 62%</b>)</p>

![client state 3](screenshots/example%20of%20changing%20state%203.png)

<p align="center">(Bathroom light is <b>ON</b> with <b>brightness 23%</b>)</p>

![client state 4](screenshots/example%20of%20changing%20state%204.png)

<p align="center">(Kitchen light is <b>ON</b> with <b>brightness 74%</b> and Bathroom is <b>OFF</b> again)</p>

### Temperature Changing

![temp update 1](screenshots/temp%20update%201.png)
![temp update 2](screenshots/temp%20update%202.png)

### Layouts

#### Desktop:

![client state 2](screenshots/hd.png)

<p align="center">(720p)</p>

![client state 3](screenshots/full%20hd.png)

<p align="center">(1080p)</p>

#### Mobile:

![client state 2](screenshots/Iphone%20XE.png)

<p align="center">(Iphone XE)</p>

#### Tablet:

![client state 3](screenshots/Ipad%20Air.png)

<p align="center">(Ipad Air)</p>