import React, { ReactElement } from 'react';
import { useState } from 'react';
import BlogPreview from '../components/BlogPreview';

interface ContentProps {
	heading: string;
	text: string;
}

const addNewBlog = () => {
	////// VARIABLES //////
	const [title, setTitle] = useState('');
	const [content, setContent] = useState<Array<ContentProps>>([]);
	const [preview, setPreview] = useState<ReactElement | null>(null);

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

	return <div className='flex flex-col'>
		<div>
			<button className='text-text-color transition-all text-xl rounded-lg hover:bg-heading-color p-3' onClick={togglePreview}>{preview ? "Edit" : "Preview"}</button>
			<button className='text-text-color transition-all text-xl rounded-lg hover:bg-heading-color p-3'>Publish Blog</button>
		</div>
		{preview ? preview :
		<div>
			<input type="text" className='text-heading-color text-4xl font-bold bg-container-color-1 p-5 ml-4 focus:outline-none' onChange={(e) => setTitle(e.target.value)} value={title} />
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

export default addNewBlog;
