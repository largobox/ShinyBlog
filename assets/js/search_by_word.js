document.getElementById('search_input_field').addEventListener('keyup', function(){
	if(this.value.length){
		displaySearchResult(searchPerform(this.value), 5)
	} else {
		document.getElementById('search_results').innerHTML = ''
	}
})

function searchPerform(search_word){
	var results    = []

	for(var post in window.store){
		if(search_word !== '' && window.store[post].title.toLowerCase().includes(search_word.toLowerCase())){
			results.push({
				'url': window.store[post].url,
				'title': window.store[post].title
			})
		}
	}
	return results
}

function displaySearchResult(results, maxCount){
	var searchResults = document.getElementById('search_results')
	var appendString = ''

	if(results.length){
		for(var i = 0; i < results.length && i < maxCount; i++){
			appendString += '<li><a href = "' + results[i].url + '"><p>'+ results[i].title +'</p></a></li>'
		}
		searchResults.innerHTML = appendString
	} else {
		searchResults.innerHTML = '<b>Совпадений нет</b>'
	}
}