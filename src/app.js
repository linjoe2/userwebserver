var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var users = require('../users.json')

app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req, resp) {
	resp.sendfile('index.html')
})
app.post('/searchRequest', function(req, resp) {
	var b = 0
	for (var i = users.length - 1; i >= 0; i--) {
		if (users[i].firstname === req.body.Name) {
			resp.send('Firstname: ' + JSON.stringify(users[i].firstname) + '<br>' + "Lastname: " + JSON.stringify(users[i].lastname) + '<br>' + 'Email: ' + JSON.stringify(users[i].email));
			console.log(users[i].firstname + ' got searched')
			var b = 1
		} else {
			if (users[i].lastname === req.body.Name) {
				resp.send('Firstname: ' + JSON.stringify(users[i].firstname) + '<br>' + "Lastname: " + JSON.stringify(users[i].lastname) + '<br>' + 'Email: ' + JSON.stringify(users[i].email));
				console.log(users[i].firstname + ' got searched')
				var b = 1
			}
			if (i === 0 && b === 0) {
				resp.send('user not found');
				console.log('user not found')
				var b = 1
			}
		}
	};
});


app.post('/addRequest', function(req, resp) {
	console.log(req.body.firstName)
	console.log(req.body.lastName)
	console.log(req.body.email)
});



app.get('/allusers', function(req, resp) {
	console.log('users sent');
	resp.send(users)
});


var server = app.listen(3000, function() {
	console.log('Example app listening on port: ' + server.address().port);
});


function findName(request, users) {
	for (var i = users.length - 1; i >= 0; i--) {
		if (users[i].firstname === req.query) {
			return users[i].firstname;
		};
	}
}