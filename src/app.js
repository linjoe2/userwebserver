var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var users = require('../users.json')

app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req, resp) {
	resp.render('index');
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


// vraag komt binnen
// gaat door if loop heen op het voorkomt in de voornaam

// gaat door een if loop heen op het voorkomen in de achternaam
// verwijst terug op zelfde pagina


// app.post('/searchRequest2', function(req, res) {
// 	for (var i = 0; i <= users.length; i++) {
// 		var usr = users[i].firstname + users[i].lastname
// 		console.log(usr) 
// 		if (usr.indexOf(req.body.Name) === -1) {
// 			console.log('empty')
// 		} else {
// 			res.send(usr)
// 			}
// 	};
// })



// app.post('/searchRequest2',
// 	bodyParser.urlencoded({
// 		extended: true
// 	}),
// 	function(request, response) {
// 		console.log(request.body.name)
// 		var b = 0
// 		var usr = request.body.name
// 		for (var i = users.length - 1; i >= 0; i--) {
// 			if (users[i].firstname === usr) {
// 				response.send('Firstname: ' + JSON.stringify(users[i].firstname) + '<br>' + "Lastname: " + JSON.stringify(users[i].lastname) + '<br>' + 'Email: ' + JSON.stringify(users[i].email));
// 				console.log(users[i].firstname + ' got searched')
// 				var b = 1
// 			} else {
// 				if (users[i].lastname === usr) {
// 					response.send('Firstname: ' + JSON.stringify(users[i].firstname) + '<br>' + "Lastname: " + JSON.stringify(users[i].lastname) + '<br>' + 'Email: ' + JSON.stringify(users[i].email));
// 					console.log(users[i].firstname + ' got searched')
// 					var b = 1
// 				}
// 				if (i === 0 && b === 0) {
// 					response.send('user not found');
// 					console.log('user not found')
// 					var b = 1
// 				}
// 			}
// 		};
// 	}
// );

app.post('/searchRequest2',
	bodyParser.urlencoded({
		extended: true
	}),
	function(request, response) {
		var b = 0
		var usr = request.body.name
		console.log('request= ' + usr)
		for (var i = 0; i <= users.length; i++) {
			var usrt = users[i].firstname + ' ' + users[i].lastname
			console.log('name= ' + usrt)
			console.log('index= ' + usrt.indexOf(usr))
			if (usrt.indexOf(usr) === -1) {
				var b = 0
			} else {
				response.send('Firstname: ' + JSON.stringify(usrt) + '<br>' + 'Email: ' + JSON.stringify(users[i].email));
				console.log(usrt + ' got searched')
				var b = 1
			}
				if (i === 0 && b === 0) {
					response.send('user not found');
					console.log('user not found')
					var b = 1
				};
		};
	}
);


app.post('/addRequest', function(req, resp) {
	var newUser = new Object();
	newUser.firstname = req.body.firstName;
	newUser.lastname = req.body.lastName;
	newUser.email = req.body.email;
	var user = JSON.stringify(newUser);
	console.log(user)
	users.push(newUser)
	resp.send(user)
});



app.get('/allusers', function(req, resp) {
	console.log('users list sent');
	resp.writeHead(200, {
		'Content-Type': 'text/plain'
	})
	for (var i = users.length - 1; i >= 0; i--) {
		resp.write('Firstname: ' + JSON.stringify(users[i].firstname) + '<br>' + "Lastname: " + JSON.stringify(users[i].lastname) + '<br>' + 'Email: ' + JSON.stringify(users[i].email) + '<br>' + '<br>');
	}
	resp.end();
});


var server = app.listen(3000, function() {
	console.log('Example app listening on port: ' + server.address().port);
});



function addlist() {
	$.get("/allusers", function(response) {
		$('.allusrs').append("<p>" + response + "</p>");
	});
}