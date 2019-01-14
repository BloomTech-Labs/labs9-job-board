require('dotenv').config();

const server = require('./api/stripeServer.js');

//uses 9000 for Stripe Server

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`\nServer listening on port ${port}\n`));
