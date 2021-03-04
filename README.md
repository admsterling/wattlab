# WATTLAB
This is a lab management system developed for Heriot-Watt University and for my final year dissertation project.

A running version of this can be found at:
[wattlab.tech](https://wattlab.tech)

Backup Link:
[Heroku App](https://watt-lab-server.herokuapp.com)


## Making Chanages to Client
Use the [vue/cli](https://www.npmjs.com/package/@vue/cli) to create a build with
```bash
cd vue
npm run build
```

And move the newly created dist folder back into the server folder to be served.
```bash
cd vue
move "dist" "../server"
```

## Environemt Variables for development
For the client builds, create a .env.development.local with the keys: 
```env
VUE_APP_DEV_FLAG = true;
# String pointing to localhost with socket server port being served on
VUE_APP_SOCKETIO_CONNECTION = "http://localhost:3000"
# String pointing to localhost with API server port being served on
VUE_APP_ENDPOINT="http://localhost:4000/graphql"
```

For the production builds, create a .env.production.local with the keys:
```env
# String pointing to https link that API is deployed too
VUE_APP_ENDPOINT="https://watt-lab-api.herokuapp.com/graphql"    
```

The server must have a .env file with the port to be deployed too for development
```env
PORT= 3000
```

API Development must be supplied with these keys in a .env file:
```env
PORT= 4000          # For Devlopment serve to port 4000
DB=""               # Connection string to the Mongo DB
KEY=""              # Key used for encrypting and verifying passwords
```

## Environemt Variables for deployment
For the server:
```env
API_ENDPOINT=""     # HTTP String to API location
```

For the API:
```env
DB=""               # Connection string to the Mongo DB
KEY=""              # Key used for encrypting and verifying passwords
```
