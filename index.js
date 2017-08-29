// express is the creation of the server
const express = require('express');
const app = express();

//require the 'request' module to make cURL request from  our back end (do the cURL request)
const request = require('request-promise');

// require the 'methodOverride' module which will let use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
// install by doing npm install method-override --save
const methodOverride = require('method-override');
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

// configure out app to use EJS templating - allows it to do server side rendering to render the index.ejs file
app.set('view engine', 'ejs');

// configure body parser to extract data from forms (and AJAX request) and appends it to the body as part of the attribute
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Telling expressjs (EJS) where to find the static assets served by OUR server AKA not the CDN stuff i.e. jQuery / BS
app.use(express.static('./assets'));




////GET Request

app.get('/persons', (req, res) => {

let options = {
    uri: 'http://myapi-profstream.herokuapp.com/api/8a7493/persons',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

request(options)
    .then((personsData) => {
    	res.render('index', {
    		persons:personsData
    	});
        console.log(personsData);
    })
    .catch((err) => {
        // API call failed...
    });
	
});

////GET POST
app.post('/persons', (req, res) => {

let options = {
    method: 'POST',
    uri: 'http://myapi-profstream.herokuapp.com/api/8a7493/persons',

    body: req.body.persons,
    json: true // Automatically stringifies the body to JSON
};

request(options)
    .then((parsedBody) => {
        // POST succeeded...
        console.log(parsedBody);
        res.redirect('/persons');
    })
    .catch((err) => {
        // POST failed...
    });
console.log(req.body);
});
// GET 

app.get('/persons/:id/edit',(req, res) => {

// step 1 Persom curl get rewuest to API using the ID from  the router paramet


let options = {
    uri: `http://myapi-profstream.herokuapp.com/api/8a7493/persons/${req.params.id}`,
    method: 'GET',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

request(options)
    .then((personsData) => {
        res.render('edit', {
            persons:personsData
        });
        console.log(personsData);
    })
    .catch((err) => {
        // API call failed...
    });

});

app.put('/persons/:id', (req, res) => {

var options = {
    method: 'PUT',
    uri: `http://myapi-profstream.herokuapp.com/api/8a7493/persons/${req.params.id}`,
    body: req.body.persons,
    json: true // Automatically stringifies the body to JSON
};

request(options)
    .then(() => {
        // POST succeeded...
        
        res.redirect('/persons');
    })
    .catch((err) => {
        // POST failed...
    });
console.log(req.body);
});

app.delete('/persons/:id', (req, res) => {

var options = {
    method: 'DELETE',
    uri: `http://myapi-profstream.herokuapp.com/api/8a7493/persons/${req.params.id}`,
   
    json: true // Automatically stringifies the body to JSON
};

request(options)
    .then(() => {
        // POST succeeded...
        
        res.redirect('/persons');
    })
    .catch((err) => {
        // POST failed...
    });


console.log(req.body);
});



















app.listen(3000, () => {
	console.log('Server started on port 3000...');
});