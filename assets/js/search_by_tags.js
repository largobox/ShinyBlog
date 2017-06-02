searchByTags()
displayChosenTagsForSearch()

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

function displayChosenTagsForSearch(){
	if(window.location.href.includes('search_by_tags')){
		tagCnt = document.getElementById('tags_for_filtering')
		urlTags = getTagsFromURL()
		if(urlTags[0] === undefined){
			tagCnt.innerHTML = '<p>Тэги не выбраны</p>'
			return
		}
		str = ''

		for(var i = 0; i < urlTags.length; i++){
			str += '<span>' + urlTags[i] + '</span>'
		}
		tagCnt.innerHTML = str
		handleDisplayForSearchByTagEl(urlTags)
	}
}

function handleDisplayForSearchByTagEl(urlTags){

	allPosts = document.getElementById('result_search_el_list').getElementsByTagName('a')
	for(var i = 0; i < allPosts.length; i++){

		parsedTags = parseTagsFromEl(allPosts[i])
		for (var j = 0; j < urlTags.length; j++){
			if(parsedTags.indexOf(urlTags[j]) === -1){
				allPosts[i].style.display = 'none'
			}
		}
	}

}

function parseTagsFromEl(el){
	data = el.getAttribute('data-tags').slice(1,-1)
	tags = data.replace(/"/g,'').split(',')
	return tags
}

function getTagsFromURL(){
 	paramsArr = decodeURIComponent(location.search).substring(1).split('&')
	res = []
	for (var i = 0; i < paramsArr.length; i++) {
		pair = paramsArr[i].split('=')
		if(pair[1] !== ''){
			res.push(pair[1].replace('+',' '))
		}
	}
	return res
}