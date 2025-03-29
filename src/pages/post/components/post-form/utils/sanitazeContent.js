export const sanitazeContent = (content) =>
	content
		.replaceAll('<div><br></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '')
		.replaceAll('<br>', '\n')
		.replaceAll('&nbsp;', ' ');
