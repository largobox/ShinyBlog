var tags = document.getElementsByClassName('search_tags_cnt')
		tags = tags[0].getElementsByTagName('li')

for(var i = 0; i < tags.length; i++){
	tags[i].onclick = function(e){
		tagName = this.innerText
		console.log(this.className === 'selected')
		this.className == 'selected' ? this.classList.remove('selected') : this.className += 'selected'
	}
}