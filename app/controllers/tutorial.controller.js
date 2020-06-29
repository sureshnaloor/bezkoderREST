const db = require('../models');
const Tutorial = db.tutorials;

// create and save new tutorial
exports.create = (req, res) => {
	//validation
	if (!req.body.title) {
		res.status(400).send({ message: 'Content cannnot be empty please!' });
	}

	const tutorial = new Tutorial({
		title: req.body.title,
		description: req.body.description,
		published: req.body.published ? req.body.published : false,
	});

	//save in database
	tutorial
		.save(tutorial)
		.then((data) => res.send(data))
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'some error occured while creating the tutorial',
			});
		});
};

//retrieve all tutorials from databae
exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title
		? { title: { $regex: new RegExp(title), $options: 'i' } }
		: {};

	Tutorial.find(condition)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving tutorials.',
			});
		});
};

//find a single tutorial with id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Tutorial.findById(id)
		.then((data) => {
			if (!data)
				res.status(404).send({ message: 'Not found Tutorial with id ' + id });
			else res.send(data);
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: 'Error retrieving Tutorial with id=' + id });
		});
};

//update tutorial by id
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Data to update can not be empty!',
		});
	}

	const id = req.params.id;

	Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
				});
			} else res.send({ message: 'Tutorial was updated successfully.' });
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating Tutorial with id=' + id,
			});
		});
};

//delete a tutorial by id
exports.delete = (req, res) => {
	const id = req.params.id;

	Tutorial.findByIdAndRemove(id)
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
				});
			} else {
				res.send({
					message: 'Tutorial was deleted successfully!',
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Tutorial with id=' + id,
			});
		});
};

//delete all tutorials of database
exports.deleteAll = (req, res) => {
	Tutorial.deleteMany({})
		.then((data) => {
			res.send({
				message: `${data.deletedCount} Tutorials were deleted successfully!`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while removing all tutorials.',
			});
		});
};

//find all published tutorials
exports.findAllPublished = (req, res) => {
	Tutorial.find({ published: true })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving tutorials.',
			});
		});
};
