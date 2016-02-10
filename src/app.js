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

app.post('/searchRequest2',
	bodyParser.urlencoded({
		extended: true
	}),
	function(request, response) {
		var b = 0
		var usr = request.body.name
		if (usr.length === 0) {
			console.log('blank field')
			b = 1
		} else {
			console.log('request= ' + usr)
			for (var i = 0; i <= users.length - 1; i++) {
				var usrt = users[i].firstname + ' ' + users[i].lastname
				if (usrt.indexOf(usr) === -1) {} else {
					response.send('Name: ' + JSON.stringify(usrt) + '<br>' + 'Email: ' + JSON.stringify(users[i].email));
					console.log(usrt + ' got searched')
					var b = 1
				}
				if (i === users.length - 1 && b === 0) {
					response.send('user not found');
					console.log('user not found')
					var b = 1
				};
			};
			console.log('----')
		}
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
	};
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



        console.log(time)
        $("#name2").keyup(function() { 
        press(time) 
      });

      function press(time) {
      var time2 = Date.now()
      console.log('time: ' + time + ' time2: ' + time2);
         if(time <= time2 -3000) {
           console.log('test')
           $('.found').html('');
            var Name = {
              name: $("#name2").val()
             };
            $.post("/searchRequest2", Name, function(response, textStatus) {
             $('.found').append("<p>"  + response + "</p>");
            });
        };
        var time = Date.now()
      };


