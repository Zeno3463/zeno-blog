import React from 'react';

interface Props {
	title: string;
	description: string;
	id: string;
}

const BlogEmbed = ({title, description, id}: Props) => {
	return <div onClick={() => location.pathname = id} className='bg-container-color-1 rounded-3xl p-5 shadow-lg bg-opacity-10 backdrop-blur-sm transition-all hover:z-10 hover:bg-opacity-100 hover:scale-110 hover:cursor-pointer'>
		<h1 className='text-heading-color font-bold lg:text-4xl overflow-clip'>{title}</h1>
		<p className='text-text-color lg:text-xl hidden overflow-hidden lg:inline'>{description}</p>
	</div>;
};

export default BlogEmbed;
