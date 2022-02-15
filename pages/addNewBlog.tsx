import React, { ReactElement, useEffect } from 'react';
import { useState } from 'react';
import BlogPreview from '../components/BlogPreview';
import { v4 } from 'uuid';
import clientPromise from '../lib/mongodb';

interface ContentProps {
	heading: string;
	text: string;
}

const AddNewBlog = ({ password }) => {
	////// VARIABLES //////
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tag, setTag] = useState('Computer Programming');
	const [content, setContent] = useState<Array<ContentProps>>([]);
	const [preview, setPreview] = useState<ReactElement | null>(null);

	////// USE EFFECTS //////
	useEffect(() => {
		// if the user is not authenticated, ask for the password
		if (localStorage.getItem('password') !== password) {
			// if the password is correct, show the form
			if (prompt('Enter the admin password: ') === password) localStorage.setItem('password', password);

			// else, redirect to the home page
			else window.location.href = '/';
		}
	}, [])

	////// FUNCTIONS //////
	const addNewSectionToContent = () => {
		setContent([...content, {
			heading: '',
			text: ''
		}]);
	}

	const editContentSection = (index: number, newHeading: string, newText: string) => {
		const newContent = [...content];
		newContent[index].heading = newHeading;
		newContent[index].text = newText;
		setContent(newContent);
	}

	const togglePreview = () => {
		setPreview(preview ? null : <BlogPreview title={title} content={content} />);
	}

	const publishBlog = async () => {
		await fetch('/api/addNewBlog', {
			method: 'POST',
			body: JSON.stringify({
				id: v4(),
				title,
				description,
				tag,
				content,
				views: 0
			})
		}).then(() => {
			window.location.href = '/';
		})
	}

	return <div className='flex flex-col'>
		<div>
			<button className='text-text-color transition-all text-xl rounded-lg hover:bg-heading-color p-3' onClick={togglePreview}>{preview ? "Edit" : "Preview"}</button>
			<button className='text-text-color transition-all text-xl rounded-lg hover:bg-heading-color p-3' onClick={publishBlog}>Publish Blog</button>
		</div>
		{preview ? preview :
		<div>
			<div className='flex flex-col'>
				<input type="text" placeholder='Title' className='text-heading-color text-4xl font-bold bg-container-color-1 p-5 m-1 ml-4 focus:outline-none' onChange={(e) => setTitle(e.target.value)} value={title} />
				<input type="text" placeholder='Description' className='text-text-color text-xl font-medium bg-container-color-1 p-5 m-1 ml-4 focus:outline-none' onChange={(e) => setDescription(e.target.value)} value={description} />
				<select className='m-1 ml-4 bg-container-color-1 text-text-color p-3 outline-none' onChange={(e) => setTag(e.target.value)}>
					<option value="Computer Programming">Computer Programming</option>
					<option value="Web Development">Web Development</option>
					<option value="Game Development">Game Development</option>
					<option value="Life Hacks">Life Hacks</option>
					<option value="Others">Others</option>
				</select>
			</div>
			<div className='flex flex-col'>
				{content.map((contentSection, index) => <div key={index} className='flex flex-col mb-5'>
					<input className='mb-2 p-2 font-semibold focus:outline-none text-heading-color bg-container-color-2' type="text" onChange={(e) => editContentSection(index, e.target.value, contentSection.text)} value={contentSection.heading} />
					<textarea className='focus:outline-none p-2 text-text-color bg-container-color-2' onChange={(e) => editContentSection(index, contentSection.heading, e.target.value)} value={contentSection.text} />
				</div>)}
			</div>
			<button className='text-text-color transition-all text-4xl rounded-lg hover:bg-heading-color m-3' onClick={addNewSectionToContent}>＋</button>
		</div>
		}
	</div>;
};

export async function getStaticProps() {
	// get the password from the database
	const client = await clientPromise;
	const db = client.db("Database");
	const password = await db.collection('password').find().toArray();
	return {
		props: {
			password: password[0].adminPassword
		}
	}
}

export default AddNewBlog;
