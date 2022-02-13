import React, { useState } from 'react';
import BlogEmbed from '../components/BlogEmbed';
import clientPromise from '../lib/mongodb';

const Categories = ({listOfCategories}) => {
	////// VARIABLES //////
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
			{selectedCategories.content.map((blog, index) => <BlogEmbed key={index} title={blog.title} description={blog.description} id={blog.id} />)}
		</div>
	</div>;
};

export async function getStaticProps() {
	// get all blogs from database
	const client = await clientPromise;
	const db = client.db("Database");
	const blogs = await db.collection("blogs").find().toArray();

	// sort all blogs by category
	var listOfCategories: any = [
		{name: "Computer Programming", content: []},
		{name: "Web Development", content: []},
		{name: "Game Development", content: []},
		{name: "Life Hacks", content: []},
		{name: "Others", content: []},
	];
	blogs.forEach((blog: any, index: number) => {
		switch (blog.tag) {
			case "Computer Programming":
				listOfCategories[0].content.push({
					title: blog.title,
					description: blog.description,
					id: blog.id
				});
				break;
			case "Web Development":
				listOfCategories[1].content.push({
					title: blog.title,
					description: blog.description,
					id: blog.id
				});
				break;
			case "Game Development":
				listOfCategories[2].content.push({
					title: blog.title,
					description: blog.description,
					id: blog.id
				});
				break;
			case "Life Hacks":
				listOfCategories[3].content.push({
					title: blog.title,
					description: blog.description,
					id: blog.id
				});
				break;
			case "Others":
				listOfCategories[4].content.push({
					title: blog.title,
					description: blog.description,
					id: blog.id
				});
				break;
			default:
				break;
		}
	});

	return {
		props: {
			listOfCategories: JSON.parse(JSON.stringify(listOfCategories))
		}
	}
}

export default Categories;
