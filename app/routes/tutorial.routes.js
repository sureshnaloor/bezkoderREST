// these are our routes
// /api/tutorials  (get all tutorials, post single tutorial, delete single tutorial)
// GET, POST, DELETE

// /api/tutorials/:id  (single tutorial by id)
//  GET, PUT, DELETE

// /api/tutorials/published (get all published tutorials)
// GET

module.exports = (app) => {
	const tutorials = require('../controllers/tutorial.controller.js');

	var router = require('express').Router();

	// Create a new Tutorial
	router.post('/', tutorials.create);

	// Retrieve all Tutorials
	router.get('/', tutorials.findAll);

	// Retrieve all published Tutorials
	router.get('/published', tutorials.findAllPublished);

	// Retrieve a single Tutorial with id
	router.get('/:id', tutorials.findOne);

	// Update a Tutorial with id
	router.put('/:id', tutorials.update);

	// Delete a Tutorial with id
	router.delete('/:id', tutorials.delete);

	// Create a new Tutorial
	router.delete('/', tutorials.deleteAll);

	app.use('/api/tutorials', router);
};
