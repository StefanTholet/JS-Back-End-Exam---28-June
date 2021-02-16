const connection = require('../credentials');
module.exports = {
        PORT: 3000,
        SALT_ROUNDS: 10,
        DB_CONNECTION: connection,
        SECRET: 'bigSecret',
        COOKIE_NAME: 'USER_SESSION',
};