import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TutorialDataService from '../services/tutorial.service';

const TutorialsList = () => {
	const [tutorials, setTutorials] = useState([]);
	const [currentTutorial, setCurrentTutorial] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchTitle, setSearchTitle] = useState('');

	useEffect(() => {
		retrieveTutorials();
	}, []);

	const onChangeSearchTitle = (e) => {
		setSearchTitle(e.target.value);
	};

	const retrieveTutorials = () => {
		TutorialDataService.getAll()
			.then((response) => {
				setTutorials(response.data);
				console.log(response.data);
			})
			.catch((e) => console.log(e));
	};

	const refreshList = () => {
		retrieveTutorials();
		setCurrentTutorial(null);
		setCurrentIndex(-1);
	};

	const setActiveTutorial = (tutorial, index) => {
		setCurrentTutorial(tutorial);
		setCurrentIndex(index);
	};

	const removeAllTutorials = () => {
		TutorialDataService.removeAll()
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const findByTitle = () => {
		TutorialDataService.findByTitle(searchTitle)
			.then((response) => {
				setTutorials(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className='list row'>
			<div className='col-md-8'>
				<div className='input-group mb-3'>
					<input
						type='text'
						name='search'
						id='search'
						placeholder='search by title'
						className='form-control'
						value={searchTitle}
						onChange={onChangeSearchTitle}
					/>

					<div className='input-group-append'>
						<button
							type='button'
							className='btn btn-outline-secondary'
							onClick={findByTitle}
						>
							{' '}
							Search
						</button>
					</div>
				</div>
			</div>

			<div className='col-md-6'>
				<h4>Tutorials List</h4>

				<ul className='list-group'>
					{tutorials &&
						tutorials.map((tutorial, index) => (
							<li
								className={
									'list-group-item ' + (index === currentIndex ? 'active' : '')
								}
								onClick={() => setActiveTutorial(tutorial, index)}
								key={index}
							>
								{tutorial.title}
							</li>
						))}
				</ul>

				<button
					className='m-3 btn btn-sm btn-danger'
					onClick={removeAllTutorials}
				>
					Remove All
				</button>
			</div>

			<div className='col-md-6'>
				{currentTutorial ? (
					<div>
						<h4>Tutorial</h4>
						<div>
							<label>
								<strong>Title:</strong>
							</label>{' '}
							{currentTutorial.title}
						</div>
						<div>
							<label>
								<strong>Description:</strong>
							</label>{' '}
							{currentTutorial.description}
						</div>
						<div>
							<label>
								<strong>Status:</strong>
							</label>{' '}
							{currentTutorial.published ? 'Published' : 'Pending'}
						</div>

						<Link
							to={'/tutorials/' + currentTutorial._id}
							className='badge badge-warning'
						>
							Edit
						</Link>
					</div>
				) : (
					<div>
						<br />
						<p>Please click on a Tutorial...</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TutorialsList;
