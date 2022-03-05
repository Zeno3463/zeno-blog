import { useEffect, useState } from "react";
import BlogEmbed from "../components/BlogEmbed"
import clientPromise from "../lib/mongodb"
import { BlogProps } from '../interfaces/interface';

export default function Home({blogs}: {blogs: Array<BlogProps>}) {
	return (
		<div>
			<div className='h-screen flex justify-around flex-col'>
				<div className='w-6/12 animate-fadeIn'>
					<h1 className='text-heading-color font-extrabold lg:text-7xl'>HI! WELCOME TO MY BLOG!</h1>
					<br />
					<p className='text-text-color font-light'>I am Zeno, a game developer, web developer, and student</p>
					<br />
					<p className='text-text-color font-light'> Interested to learn more? Visit my<a href="https://zeno-zeno3463.vercel.app/" target="_blank" rel="noopener noreferrer">portfolio</a></p>
				</div>
				<div className='flex justify-center'>
					<p className='text-text-color font-light'>Scroll Down</p>
				</div>
			</div>
			<div>
				<h1 className='text-text-color lg:text-7xl font-extrabold'>Recent Blogs</h1>
				<br />
				<div className='grid grid-cols-3'>
					{blogs.map((blog: BlogProps) => <BlogEmbed key={blog.id} title={blog.title} description={blog.description} id={blog.id} />)}
				</div>
			</div>
		</div>
	)
}

export const getStaticProps = async () => {
	const client = await clientPromise;
	const db = client.db("Database");
	const blogs = await db.collection("blogs").find({}).toArray();
	return {
		props: {
			blogs: JSON.parse(JSON.stringify(blogs))
		},
		revalidate: 60
	}
}