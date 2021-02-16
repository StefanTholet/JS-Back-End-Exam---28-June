const express = require('express');
const traceErrors = require('trace-unhandled');
const config = require('./config');
const routes = require('./routes');
const app = express();

require('./config/express')(app);
require('./config/mongoose')(app);

app.use(routes);

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));