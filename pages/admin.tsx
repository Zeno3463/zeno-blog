import React, { useEffect } from 'react'
import { BlogProps } from '../interfaces/interface';
import clientPromise from '../lib/mongodb'

const Admin = ({password, blogs}: {password: string, blogs: Array<BlogProps>}) => {
	////// USE EFFECTS //////
	useEffect(() => {
		// if the user is not authenticated, ask for the password
		if (localStorage.getItem('password') !== password) {
			// if the password is correct, show the admin panel
			if (prompt('Enter the admin password: ') === password) localStorage.setItem('password', password);
			
			// else, redirect to the home page
			else window.location.href = '/'
		}
	}, [])

	////// FUNCTIONS //////
	const deleteBlog = async (id: string) => {
		await fetch('/api/deleteBlogByID', {
			method: 'POST',
			body: JSON.stringify({
				id: id
			})
		}).then(() => window.location.reload())
	}

	return <div>
		<div className='h-screen flex justify-around flex-col'>
			<div className='w-6/12 animate-fadeIn'>
				<h1 className='text-heading-color font-extrabold lg:text-7xl'>ADMIN PANEL</h1>
				<br />
				<p className='text-text-color font-light'>Welcome, Zeno!</p>
				<br />
				<p className='text-text-color font-light'><strong>{blogs.length}</strong>blogs have been published so far.</p>
			</div>
			<div className='flex justify-center'>
				<p className='text-text-color font-light'>Scroll Down</p>
			</div>
		</div>
		<table className='w-full'>
			<tr className='text-heading-color text-left'>
				<th className='p-3 border border-text-color'>Title</th>
				<th className='p-3 border border-text-color'>Description</th>
				<th className='p-3 border border-text-color'>Views</th>
				<th className='p-3 border border-text-color'>Delete</th>
			</tr>
			{blogs.map((blog, index) => <tr key={index} className='text-text-color'>
				<td className='p-3 border'>{blog.title}</td>
				<td className='p-3 border'>{blog.description}</td>
				<td className='p-3 border'>{Math.round(blog.views / 3)}</td>
				<td className='p-3 border'><button onClick={() => deleteBlog(blog.id)} className='bg-warning-color p-2 rounded-lg transition-all hover:opacity-50'>Delete</button></td>
			</tr>)}
		</table>
	</div>
}

export async function getStaticProps() {
	// get the password from the database
	const client = await clientPromise;
	const db = client.db("Database");
	const password = await db.collection("password").find().toArray();
	const blogs = await db.collection("blogs").find().toArray();
	return {
		props: {
			password: password[0].adminPassword,
			blogs: JSON.parse(JSON.stringify(blogs))
		},
		revalidate: 60
	}
}

export default Admin