import { useEffect, useState } from "react";
import BlogEmbed from "../components/BlogEmbed"
import clientPromise from "../lib/mongodb"

interface ContentProps {
	heading: string,
	text: string
}

interface BlogProps {
	title: string,
	content: Array<ContentProps>,
	description: string,
	id: string
}

export default function Home() {
	////// VARIABLES //////
	const [blogs, setBlogs] = useState([]);

	////// USE EFFECT //////
	useEffect(() => {
		// get all blogs
		const func = async () => {
			await fetch('/api/getAllBlogs', {
				method: 'POST',
			}).then(res => res.json()).then(res => {
				setBlogs(res);
			})
		}

		func();
	}, [])

	return (
		<div>
			<div className='h-screen flex justify-around flex-col'>
				<div className='w-6/12 animate-fadeIn'>
					<h1 className='text-heading-color font-extrabold lg:text-7xl'>HI! WELCOME TO MY BLOG!</h1>
					<br />
					<p className='text-text-color font-light'>I am Zeno, a game developer, web developer, and student</p>
					<br />
					<p className='text-text-color font-light'> Interested to learn more? Visit my<a href="https://zeno-zeno3463.vercel.app/" target="_blank" rel="noopener noreferrer" className='font-semibold underline text-heading-color'>portfolio</a></p>
				</div>
				<div className='flex justify-center'>
					<p className='text-text-color font-light'>Scroll Down</p>
				</div>
			</div>
			<div>
				<h1 className='text-text-color lg:text-7xl font-extrabold'>Recent Blogs</h1>
				<br />
				<div className='grid grid-cols-3'>
					<div className='absolute bg-container-color-2 lg:w-5/6 lg:h-full w-0 h-0 -z-10 m-10 rounded-3xl'></div>
					{blogs.map((blog: BlogProps) => <BlogEmbed key={blog.id} title={blog.title} description={blog.description} id={blog.id} />)}
				</div>
			</div>
		</div>
	)
}