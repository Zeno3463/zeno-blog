import React, { useState } from 'react';
import BlogEmbed from '../components/BlogEmbed';

const Categories = () => {
	////// VARIABLES //////
	const listOfCategories = [
		{name: "Computer Programming", content: [
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
		]},
		{name: "Web Development", content: [
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
		]},
		{name: "Game Development", content: [
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
		]},
		{name: "Life Hacks", content: [
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
		]},
		{name: "Others", content: [
			<BlogEmbed title="Road Map To A Web Developer" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus in lorem vestibulum lectus." id="hello" />,
		]},
	];
	const [selectedCategories, setSelectedCategories] = useState(listOfCategories[0]);

	return <div>
		<br />
		<h1 className='text-text-color lg:text-7xl font-extrabold'>Categories</h1>
		<br />
		<ul className='text-text-color flex'>
			{/* List out all categories' name */}
			{listOfCategories.map((category, index) => 
			<li key={index} className='border m-0 p-2 pl-20 pr-20'>
				<button className='transition-all hover:text-heading-color' onClick={() => setSelectedCategories(category)}>
					{category.name === selectedCategories.name ? 
					<p className='text-heading-color font-normal'>{category.name}</p> : 
					<p className='font-light'>{category.name}</p>}
				</button>
			</li>
			)}
		</ul>
		<div className='grid grid-cols-3'>
			<div className='absolute bg-container-color-2 lg:w-5/6 lg:h-full w-0 h-0 -z-10 m-10 rounded-3xl'></div>
			{/* List out all the blogs in the selected category */}
			{selectedCategories.content.map((blog, index) => blog)}
		</div>
	</div>;
};

export default Categories;
