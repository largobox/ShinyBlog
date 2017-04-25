displayChosenTagsForSearch()

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