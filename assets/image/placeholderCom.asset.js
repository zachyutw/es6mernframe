const placeholderComUrl = 'https://via.placeholder.com';
const DEFAULT_IMAGE = 'https://via.placeholder.com/300/09f/fff.png';
const getPlaceholderImage = (text, size = '300x300', background = '09f', color = 'fff', ext = '.png') =>
	text
		? `${placeholderComUrl}/${size}/${background}/${color}${ext}?text=${text}`
		: `${placeholderComUrl}/${size}/${background}/${color}${ext}`;

export default DEFAULT_IMAGE;
export const placeholderImage = getPlaceholderImage();
