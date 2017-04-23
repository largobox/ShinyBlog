activeHeaderMenuElement()
searchByTags()

function activeHeaderMenuElement(){
	currentUrl = window.location.pathname
	if (currentUrl.includes('blog')){ document.getElementById('blog_root').className += 'active'}
	if (currentUrl.includes('about')){ document.getElementById('about_root').className += 'active'}
}

function searchByTags(){
	tagsCnt = document.getElementsByClassName('search_tags_cnt')
	tags = tagsCnt[0].getElementsByTagName('li')

	for(var i = 0; i < tags.length; i++){
		tags[i].onclick = function(e){
			tagName = this.innerText
			this.className == 'selected' ? this.classList.remove('selected') : this.className += 'selected'
		}
	}
}
