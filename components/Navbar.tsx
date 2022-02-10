import React from 'react';
import Link from 'next/link';

const Navbar = () => {
	return <div>
		<ul className='text-text-color font-light flex'>
			<li className='p-1 transition-all hover:bg-heading-color rounded-md'>
				<Link href='/'>Home</Link>
			</li>
			<li className='p-1 transition-all hover:bg-heading-color rounded-md'>
				<Link href='/categories'>Categories</Link>
			</li>
		</ul>
	</div>;
};

export default Navbar;
