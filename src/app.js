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
	var newUser = new Object();
	newUser.firstname = req.body.firstName;
	newUser.lastname = req.body.lastName;
	newUser.email = req.body.email;
	var user = JSON.stringify(newUser);
	console.log(user)
	users.push(newUser)
});



app.get('/allusers', function(req, resp) {
	console.log('users list sent');
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