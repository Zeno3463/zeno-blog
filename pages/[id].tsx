import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingScreen from '../components/LoadingScreen';
import clientPromise from '../lib/mongodb';

interface ContentSegmentProps {
	heading: string;
	text: string;
}

const Blog = ({id, title, content}: any) => {
	////// VARIABLES //////
	const [viewCountUpdated, setViewCountUpdated] =	useState(false);
	const [contentDisplay, setContentDisplay] = useState<any>();

	useEffect(() => {
		// update view count after successfully retrieving blog data
		const func = async () => {
			await fetch('/api/addViewCount', {
				method: 'POST',
				body: JSON.stringify({id: id})
			}).then(() => {
				setViewCountUpdated(true)
				setContentDisplay(content);
			});
		}

		if (!viewCountUpdated) func();
	})

	return <div>
		{title === '' ? <LoadingScreen /> : <div>
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
				<div className='grid grid-cols-1 bg-container-color-2 rounded-lg'>
					{contentDisplay?.map((contentSegment, index) => <div className='flex' key={index}>
						{index % 2 !== 0 ? <div className='flex-none lg:w-5/12'></div> : null}
						<div className='bg-container-color-1 flex-1 rounded-3xl pl-5 pr-5 pt-10 pb-10 shadow-lg bg-opacity-10 backdrop-blur-sm transition-all hover:z-10 hover:scale-110'>
							<h1 className='text-heading-color font-bold lg:text-4xl overflow-clip'>{contentSegment.heading}</h1>
							<p className='text-text-color lg:text-xl' dangerouslySetInnerHTML={{__html: contentSegment.text}}></p>
						</div>
						{index % 2 === 0 ? <div className='flex-none lg:w-5/12'></div> : null}
					</div>)}
				</div>
			</div>
		</div>
		}
	</div>;
};

export const getStaticPaths = async () => {
	const client = await clientPromise;
	const db = client.db('Database');
	const blogs = await db.collection('blogs').find({}).toArray();
	return {
		paths: blogs.map(blog => ({params: {id: blog.id}})),
		fallback: true
	}
}

export const getStaticProps = async ({params}) => {
	const client = await clientPromise;
	const db = client.db('Database');
	const blogs = await db.collection('blogs').find({id: params.id}).toArray();
	const blog = blogs[0];
	return {
		props: {
			id: params.id,
			title: blog.title,
			content: blog.content
		},
		revalidate: 60
	}
}

export default Blog;
