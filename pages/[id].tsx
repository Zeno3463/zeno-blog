import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface ContentSegmentProps {
	heading: string;
	text: string;
}

const Blog = () => {
	////// VARIABLES //////
	const router = useRouter();
	const { id } = router.query;
	const [title, setTitle] = useState('');
	const [content, setContent] = useState<Array<ContentSegmentProps>>([]);
	const [dataRetrieved, setDataRetrieved] = useState(false);

	////// USE EFFECTS //////
	useEffect(() => {
		// get blog data on load
		const func = async () => {
			await fetch('/api/getBlogByID', {
				method: 'POST',
				body: JSON.stringify({id: id})
			}).then(res => res.json()).then(res => {
				setDataRetrieved(true);
				setTitle(res.title);
				setContent(res.content);
			})
		}

		if (!dataRetrieved) func();
	})

	return <div>
		{/* Display the title of the blog */}
		<div className='h-screen flex justify-around flex-col'>
			<div className='flex justify-center'>
				<h1 className='text-heading-color font-bold text-5xl lg:text-9xl animate-fadeIn'>{title}</h1>
				<div className='w-1/12 h-full bg-heading-color hidden lg:inline-block animate-slideLeft'></div>
			</div>
			<div className='flex justify-center'>
				<p className='text-text-color font-light'>Scroll Down</p>
			</div>
		</div>

		{/* Display the content of the blog */}
		<div>
			<div className='grid grid-cols-1'>
				<div className='absolute bg-container-color-2 lg:w-5/6 lg:h-full w-0 h-0 -z-10 m-10 rounded-3xl'></div>
				{content.map((contentSegment, index) => <div className='flex' key={index}>
					{index % 2 !== 0 ? <div className='flex-none lg:w-5/12'></div> : null}
					<div className='bg-container-color-1 flex-1 rounded-3xl pl-5 pr-5 pt-10 pb-10 shadow-lg bg-opacity-10 backdrop-blur-sm transition-all hover:z-10 hover:scale-110'>
						<h1 className='text-heading-color font-bold lg:text-4xl overflow-clip'>{contentSegment.heading}</h1>
						<p className='text-text-color lg:text-xl' dangerouslySetInnerHTML={{__html: contentSegment.text}}></p>
					</div>
					{index % 2 === 0 ? <div className='flex-none lg:w-5/12'></div> : null}
				</div>)}
			</div>
		</div>
	</div>;
};

export default Blog;
