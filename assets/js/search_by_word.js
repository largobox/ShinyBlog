previewSearchResults()
searchPageResults()

function searchPageResults(){
	if(window.location.href.includes('search')){
		q = getSearchQueryVariable('query')
		displaySearchResultForPage(searchPerform(q))
	}
}


function getSearchQueryVariable(variable){
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) { return decodeURIComponent(pair[1].replace(/\+/g, '%20')) }
  }
}

function previewSearchResults(){
	document.getElementById('search_input_field').addEventListener('keyup', function(){
		if(this.value.length){
			displaySearchResult(searchPerform(this.value), 5)
		} else {
			document.getElementById('search_results').innerHTML = ''
		}
	})
}

function searchPerform(search_word){
	var results = []

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

function displaySearchResultForPage(results){
	var searchResults = document.getElementById('result_search_el_list')
	var appendString = ''
	if(results.length){
		for(var i = 0; i < results.length; i++){
			appendString += '<a href = "' + results[i].url + '"><li>'+ results[i].title +'</li></a>'
		}
		searchResults.innerHTML = appendString
	} else {
		searchResults.innerHTML = '<b>Совпадений нет</b>'
	}
}