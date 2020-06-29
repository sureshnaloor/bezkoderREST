import React, { useState, useEffect } from 'react';
import TutorialDataService from '../services/tutorial.service';

const Tutorial = (props) => {
	const initTutorialState = {
		id: null,
		title: '',
		description: '',
		published: false,
	};

	const [currentTutorial, setCurrentTutorial] = useState(initTutorialState);
	const [message, setMessage] = useState('');

	const getTutorial = (id) => {
		TutorialDataService.get(id)
			.then((response) => {
				setCurrentTutorial(response.data);
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		console.log(props.match.params.id);
		getTutorial(props.match.params.id);
	}, [props.match.params.id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCurrentTutorial({ ...currentTutorial, [name]: value });
	};

	const updatePublished = (status) => {
		var data = {
			id: currentTutorial._id,
			title: currentTutorial.title,
			description: currentTutorial.description,
			published: status,
		};

		TutorialDataService.update(currentTutorial._id, data)
			.then((response) => {
				setCurrentTutorial({ ...currentTutorial, published: status });
				console.log(response.data);
			})
			.catch((e) => console.log(e));
	};

	const updateTutorial = () => {
		TutorialDataService.update(currentTutorial._id, currentTutorial)
			.then((response) => {
				console.log(response.data);
				setMessage('The tutorial was updated successfully');
			})
			.catch((e) => console.log(e));
	};

	const deleteTutorial = () => {
		TutorialDataService.remove(currentTutorial._id)
			.then((response) => {
				console.log(response.data);
				props.history.push('/tutorials');
			})
			.catch((e) => console.log(e));
	};

	return (
		<div>
			{currentTutorial ? (
				<div className='edit-form'>
					<h4> Tutorial </h4>
					<form>
						<div className='form-group'>
							<label htmlFor='title'> Title </label>
							<input
								type='text'
								className='form-control'
								name='title'
								id='title'
								value={currentTutorial.title}
								onChange={handleInputChange}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='description'> Description </label>
							<input
								type='text'
								className='form-control'
								name='description'
								id='description'
								value={currentTutorial.description}
								onChange={handleInputChange}
							/>
						</div>

						<div className='form-group'>
							<label>
								<strong> Status: </strong>
							</label>
							{currentTutorial.published ? 'Published' : 'Pending'}
						</div>
					</form>

					{currentTutorial.published ? (
						<button
							className='badge badge-primary mr-2'
							onClick={() => updatePublished(false)}
						>
							Unpublish
						</button>
					) : (
						<button
							className='badge badge-primary mr-2'
							onClick={() => updatePublished(true)}
						>
							Publish
						</button>
					)}
					<button className='badge badge-danger mr-2' onClick={deleteTutorial}>
						Delete
					</button>

					<button
						type='submit'
						className='badge badge-success'
						onClick={updateTutorial}
					>
						{' '}
						Update{' '}
					</button>

					<p> {message} </p>
				</div>
			) : (
				<div>
					<br />
					<p> Please click on a tutorial </p>
				</div>
			)}
		</div>
	);
};

export default Tutorial;
