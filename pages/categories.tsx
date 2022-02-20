import React, { useEffect, useState } from 'react';
import BlogEmbed from '../components/BlogEmbed';

interface BlogProps {
	title: string,
	description: string,
	id: string
}

interface ListOfCategoriesProps {
	name: string,
	content: Array<BlogProps>
}

const Categories = () => {
	////// VARIABLES //////
	const [selectedCategories, setSelectedCategories] = useState({
		name: 'Computer Programming',
		content: []
	});
	const [listOfCategories, setListOfCategories] = useState<ListOfCategoriesProps | any>([
		{name: "Computer Programming", content: []},
		{name: "Web Development", content: []},
		{name: "Blockchain Development", content: []},
		{name: "Game Development", content: []},
		{name: "Life Hacks", content: []},
		{name: "Others", content: []},
	]);

	////// USE EFFECT //////
	useEffect(() => {
		// get all blogs
		const func = async () => {
			await fetch('/api/getAllBlogs', {
				method: 'POST',
			}).then(res => res.json()).then(res => {
				var list: any = [
					{name: "Computer Programming", content: []},
					{name: "Web Development", content: []},
					{name: "Blockchain Development", content: []},
					{name: "Game Development", content: []},
					{name: "Life Hacks", content: []},
					{name: "Others", content: []},
				];
				
				// filter the blogs by category
				res.forEach((blog: any, index: number) => {
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

				setListOfCategories(list);
				setSelectedCategories(list[0]);
			})
		}

		func();
	}, [])

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

export default Categories;
