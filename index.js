const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('connected to database local');
	})
	.catch((err) => {
		console.log('not able to connect to databse, check!', err);
		process.exit();
	});

app.get('/', (_, res) => {
	res.json({ message: 'welcome to rest application!' });
});

// routes import
require('./app/routes/tutorial.routes')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`server is running on http://localhost.com:${port}`);
});
