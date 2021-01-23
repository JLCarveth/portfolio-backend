# Portfolio Backend Documentation

## Getting Started
There are a couple of requirements for running this backend service:
- Node.js (This service was developped using Node v15.5.1, but should run fine on the current Node 14.15.4 LTS)
- npm (version 7.4.2 was used)
- A secret key. See [Generating a Secret Key](#generating-a-secret-key)
- A MySQL Database
- A Google Account (for Gmail OAuth2)

### Generating a Secret Key
A secret key is used when hashing passwords before being stored and upon authentication. A simple way to generate a good secret key is with the following command:
```
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
A random string of characters will be output to the console. This string can then be copied and pasted into your `config/config.json` file.