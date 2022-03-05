export interface ContentSegmentProps {
	heading: string;
	text: string;
}

export interface ContentProps {
	heading: string,
	text: string
}

export interface BlogProps {
	title: string,
	content: Array<ContentProps>,
	description: string,
	id: string,
	views: number
}

export interface ListOfCategoriesProps {
	name: string,
	content: Array<BlogProps>
}