import React from 'react'

const LoadingScreen = () => {
	return <div className='h-screen flex justify-around flex-col'>
		<div className='flex justify-center'>
			<div className='flex justify-center flex-col animate-spin'>
				<div className='bg-heading-color w-5 h-5'></div>
			</div>
			<div className='flex justify-center flex-col'>	
				<h1 className='text-text-color'>Loading...</h1>
			</div>
		</div>
	</div>
}

export default LoadingScreen