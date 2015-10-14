var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var postDB = [
	{title: 'post 1', content: 'blah blah', author: 'balho'},
	{title: 'post 2', content: 'blah blah', author: 'balha'}
];

app.use(bodyParser.urlencoded({ extend: false}));
app.use(bodyParser.json());

app.set(express.static(path.join(__dirname, '/public')));

app.set('port', 3000);

app.get('/posts', function(req, res) {
	res.send(postDB);
});

app.post('/posts/new', function(req, res) {
	postDB.push(req.body);
	console.log(postDB);
	res.send({status: 'success'});
});

app.listen(app.get('port'), function() {
	console.log('App listening on http://localhost:%s', app.get('port'));
});