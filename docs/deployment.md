# Deployment

This document will cover the steps that I took to deploy both the backend and frontend onto a DigitalOcean VM.

### Cloning the Git Repository
The first step towards deploying the application will be to clone the git repository for the backend. This can be done in any directory on the target system, I've chosen `/opt/`. Cloning the repository is as simple as:
```
git clone https://github.com/jlcarveth/portfolio-backend.git /opt/portfolio-backend/
```
### Configuration
Thie program relies on a configuration file, `/config/config.json`. This file has the following structure:
```
{
    "secretKey": "",
    "emailAddress": "",
    "mysql": {
        "host" : "",
        "user" : "",
        "password" : "",
        "database" : ""
    },
    "oauth": {
        "clientID": "",
        "clientSecret": "",
        "refreshToken": ""
    }
}
```
- **Secret Key** : This is a key that is used to sign and verify hashes. See [Generating a Secret Key](./readme.md#generating-a-secret-key) for more information.
- **emailAddress** : The email address that will be used for sending system email.
- **clientID, clientSecret, refreshToken** : These can be obtained by setting up a Google OAuth2 credential.
- **MySQL**: MySQL database settings. Hopefully self-explanatory.

From your install directory, run `touch config/config.json`. Then use your favorite text editor to apply your settings.

### MySQL Setup
The database and login into can be modified in `config.json`. Ensure that the database and user exist before running the program.
At the moment, the software doesn't create the SQL tables. This needs to be done by running the `.sql` files found within the `sql/` directory.

### Installing the Frontend
Installing the frontend should be as simple as cloning the frontend repository into `/var/www/html/` provided apache2 is installed and configured already. 
```
git clone https://github.com/jlcarveth/jlcarveth.github.io /var/www/html/
```
Ensure Apache is running with the command `sudo systemctl status apache2`, and navigate to `localhost:80` in your browser.

### Running the Backend Service
First, ensure that `app.js` is runnable by executing `chmod +x app.js` in the backend installation directory. Then copy the service file into the systemd service directory: `sudo cp portfolio.service /etc/systemd/system`