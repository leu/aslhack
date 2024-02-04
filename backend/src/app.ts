import express from "express"
import https from "https"
import fs from "fs"
import { Server } from "http";
import { logger } from "../lib/logger";
require('dotenv').config();

const app = express()
const port = 3001

app.use(function(req, res, next) {
	// const re = /https?:\/\/localhost:[0-9]+/
	// if (re.test(req.headers.origin as string)) {
	// 	res.header("Access-Control-Allow-Origin", req.headers.origin)
	// }
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "*")
	next()
})

// Use endpoints in these files
require('./error-handler')
require('./create')(app)

var server: Server

if (process.env.NODE_ENV === 'development') {
  // server listens on http
  server = app.listen(port, () => {
    logger.info(`Server is listening on port ${port}.`);
  });

  console.log(app._router.stack)
} else { 
	// server listens on http
	server = app.listen(port, () => {
		logger.info(`Server is listening on port ${port}.`);
	})

	// // server listens on https
	// var privateKey = fs.readFileSync( '/etc/letsencrypt/live/discordfox.com/privkey.pem' );
	// var certificate = fs.readFileSync( '/etc/letsencrypt/live/discordfox.com/fullchain.pem' );

	// server = https.createServer({
	// 	key: privateKey,
	// 	cert: certificate
	// }, app).listen(port)
	// logger.info(`Server is listening on port ${port}`)
}

const closeServer = () => {
	server.close();
};

export { app, closeServer };
