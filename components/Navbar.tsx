import React from 'react';
import Link from 'next/link';

const Navbar = () => {
	return <div>
		<ul className='text-text-color font-light flex'>
			<li className='p-1 transition-all hover:bg-heading-color rounded-md'>
				<Link href='/'><p className='hover:cursor-pointer p-1'>Home</p></Link>
			</li>
			<li className='p-1 transition-all hover:bg-heading-color rounded-md'>
				<Link href='/categories'><p className='hover:cursor-pointer p-1'>Categories</p></Link>
			</li>
		</ul>
	</div>;
};

export default Navbar;
