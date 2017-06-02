activeHeaderMenuElement()

function activeHeaderMenuElement(){
	currentUrl = window.location.pathname
	if (currentUrl.includes('blog')){ document.getElementById('blog_root').className += 'active'}
	if (currentUrl.includes('about')){ document.getElementById('about_root').className += 'active'}
}