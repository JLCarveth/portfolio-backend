# Deployment

This document will cover the steps that I took to deploy both the backend and frontend onto a DigitalOcean VM using Nginx.

## Installing Required Software
You'll need a couple software packages to properly deploy both the backend and frontent. Depending on the distribution you chose, some of these tools may already be installed. 
- Nginx
- MySQL
- Node and NPM (Use Node Version Manager (NVM) for easy install)
- Git for pulling the source code
- Certbot for the SSL certificate

## Cloning the Git Repository
The first step towards deploying the application will be to clone the git repository for the backend. This can be done in any directory on the target system, I've chosen `/opt/portfolio-backend/`. Cloning the repository is as simple as:
```
git clone https://github.com/jlcarveth/portfolio-backend.git /opt/portfolio-backend/
```
## Configuration
Thie program relies on a configuration file, `/config/config.json`. This file has the following structure:
```
{
    "secretKey": "",
    "emailAddress": "",
    "mysqlHost": "",
    "mysqlUser": "",
    "mysqlPassword": "",
    "mysqlDatabase": "",
    "clientID": "",
    "clientSecret": "",
    "refreshToken": ""
}
```
- **Secret Key** : This is a key that is used to sign and verify hashes. See [Generating a Secret Key](./readme.md#generating-a-secret-key) for more information.
- **emailAddress** : The email address that will be used for sending system email.
- **clientID, clientSecret, refreshToken** : These can be obtained by setting up a Google OAuth2 credential. This was obtained by creating a new project on the Google Cloud Console and using the Google OAuth Playground to retrieve a refresh token.
- **mysql***: MySQL database settings. Hopefully self-explanatory.

From your install directory, run `touch config/config.json`. Then use your favorite text editor to apply your settings.

### MySQL Setup
The database and login into can be modified in `config.json`. Ensure that the database and user exist before running the program.
At the moment, the software doesn't create the SQL tables. This needs to be done by running the `.sql` files found within the `sql/` directory.

## Configuring Nginx
A small change needs to be made to the nginx configuration to ensure that requests to the backend are not recieved by the server hosting the frontend, and vice-versa. Execute `sudo nano /etc/nginx/sites-available/default` to modify the configuration file. Create a new block under `location { ... }` consisting of the following:
```
location /api {
                proxy_pass http://localhost:29742;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
```
My Node.js application is listening on port 29742, and all api routes are prepended with `/api/`. When you are done editing the config, run `nginx -t` to test that there are no errors. If everything is ok, then restart nginx `sudo systemctl restart nginx`.

## Installing the Frontend
Installing the frontend should be as simple as cloning the frontend repository into `/var/www/html/`.
```
git clone https://github.com/jlcarveth/jlcarveth.github.io /var/www/html/
```
Ensure nginx is running with the command `sudo systemctl status nginx`, and navigate to `localhost:80` in your browser.

### Running the Backend Service
First, ensure that `app.js` is runnable by executing `chmod +x app.js` in the backend installation directory. Then copy the service file into the systemd service directory: `sudo cp portfolio.service /etc/systemd/system`