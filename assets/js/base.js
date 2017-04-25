activeHeaderMenuElement()
searchByTags()

function activeHeaderMenuElement(){
	currentUrl = window.location.pathname
	if (currentUrl.includes('blog')){ document.getElementById('blog_root').className += 'active'}
	if (currentUrl.includes('about')){ document.getElementById('about_root').className += 'active'}
}

function searchByTags(){
	tagsCnt = document.getElementsByClassName('search_tags_cnt')
	tags = tagsCnt[0].getElementsByTagName('label')

	for(var i = 0; i < tags.length; i++){
		tags[i].onclick = function(e){

			var targetInput = document.getElementById(this.htmlFor)

			if(this.className == 'selected'){
				this.classList.remove('selected')
				targetInput.disabled = true
			} else {
				this.className += 'selected'
				targetInput.disabled = false
			} 
		}
	}
}
