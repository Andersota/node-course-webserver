const express = require( 'express' );
const hbs = require( 'hbs' );

const fs = require( 'fs' );

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials( __dirname + '/views/partials' );

app.set( 'view engine', 'hbs' );

app.use( express.static( __dirname + '/public' ) );

app.use( ( req, res, next ) => {

	var log = {
		time : new Date().toString(),
		method : req.method,
		url : req.url
	};

	fs.appendFile( 'server.log', JSON.stringify( log ) + '\n', ( err ) => {

	});

	next();
});

hbs.registerHelper( 'getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper( 'screamIt', ( message ) => {
	return message.toUpperCase();
});

app.get( '/', ( req, res ) => {
	res.render( 'home.hbs', {
		pageTitle : 'Home Page',
		message : 'Welcome Message'
	});
});

app.get( '/about', ( req, res ) => {
	res.render( 'about.hbs', {
		pageTitle : 'About Page'
	});
});

app.get( '/bad', ( req, res ) => {
	//console.log( req );
	
	res.send({
		errorMessage : 'Request Failed'
	});
});

app.listen( port );