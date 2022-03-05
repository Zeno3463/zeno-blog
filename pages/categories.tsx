import React, { useState } from 'react';
import BlogEmbed from '../components/BlogEmbed';
import clientPromise from '../lib/mongodb';
import { ListOfCategoriesProps } from '../interfaces/interface';

const Categories = ({listOfCategories}: {listOfCategories: Array<ListOfCategoriesProps> | any}) => {
	////// VARIABLES //////
	const [selectedCategories, setSelectedCategories] = useState({
		name: 'Computer Programming',
		content: []
	});

	return <div className='animate-fadeIn'>
		<br />
		<h1 className='text-text-color lg:text-7xl font-extrabold'>Categories</h1>
		<br />
		<ul className='text-text-color flex'>
			{/* List out all categories' name */}
			{listOfCategories.map((category, index) => 
			<li key={index} className='border m-0 p-2 pl-14 pr-14'>
				<button className='transition-all hover:text-heading-color' onClick={() => setSelectedCategories(category)}>
					{category.name === selectedCategories.name ? 
					<p className='text-heading-color font-normal'>{category.name}</p> : 
					<p className='font-light'>{category.name}</p>}
				</button>
			</li>
			)}
		</ul>
		<div className='grid grid-cols-3'>
			{/* List out all the blogs in the selected category */}
			{selectedCategories.content.map((blog: any, index) => <BlogEmbed key={index} title={blog.title} description={blog.description} id={blog.id} />)}
		</div>
	</div>;
};

export const getStaticProps = async () => {
	const client = await clientPromise;
	const db = client.db('Database');
	const blogs = await db.collection('blogs').find({}).toArray();
	var list: any = [
		{name: "Computer Programming", content: []},
		{name: "Web Development", content: []},
		{name: "Blockchain Development", content: []},
		{name: "Game Development", content: []},
		{name: "Life Hacks", content: []},
		{name: "Others", content: []},
	];
	
	// filter the blogs by category
	blogs.forEach((blog: any, index: number) => {
		switch (blog.tag) {
			case "Computer Programming":
				list[0].content.push({
					title: blog.title,
					description: blog.description,
					id: blog.id
				});
				break;
			case "Web Development":
				list[1].content.push({
					title: blog.title,
					description: blog.description,
					id: blog.id
				});
				break;
			case "Blockchain Development":
				list[2].content.push({
					title: blog.title,
					description: blog.description,
					id: blog.id
				});
				break;
			case "Game Development":
				list[3].content.push({
					title: blog.title,
					description: blog.description,
					id: blog.id
				});
				break;
			case "Life Hacks":
				list[4].content.push({
					title: blog.title,
					description: blog.description,
					id: blog.id
				});
				break;
			case "Others":
				list[5].content.push({
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
			listOfCategories: list
		},
		revalidate: 60
	}
}

export default Categories;
